import { useEffect, useState } from "react";
import { Movie } from "../../types/Movie"
import ApiService from "../../service/ApiService";
import { PageResponse } from "../../types/PageResponse";
import UpcomingMoviesList from "./upcoming-movies-list/UpcomingMoviesList";
import TertiaryButton from "../shared-components/buttons/TertiaryButton";
import { SelectOptionType } from "../../types/SelectOptionType";
import { calculateDateString } from "../../utils/utils";
import { useSearchParams } from "react-router-dom";
import { UpcomingMoviesFormData } from "../../types/CurrentlyShowingFormData";
import { Genre } from "../../types/Genre";
import { City } from "../../types/City";
import { Venue } from "../../types/Venue";
import debounce from "lodash.debounce";
import { SingleValue } from "react-select";
import UpcomingMoviesForm from "./upcoming-movies-form/UpcomingMoviesForm";

export default function UpcomingMoviesPage() {
    let [searchParams, setSearchParams] = useSearchParams();
    let [movies, setMovies] = useState<Movie[]>([]);
    let [page, setPage] = useState(0); // Current page number
    let [isLastPage, setIsLastPage] = useState(false); // Track if we're on the last page
    const PAGE_SIZE: string = "9";
    const START_DATE: string = calculateDateString(7);
    const END_DATE: string = calculateDateString(100);

    let [cityOptions, setCityOptions] = useState<SelectOptionType[]>();
    let [genreOptions, setGenreOptions] = useState<SelectOptionType[]>();
    let [venueOptions, setVenueOptions] = useState<SelectOptionType[]>();

    let [formData, setFormData] = useState<UpcomingMoviesFormData>({
        title: searchParams.get("title") || "",
        city: searchParams.get("city") ? { value: searchParams.get("city")!, label: "" } : null,
        venue: searchParams.get("venue") ? { value: searchParams.get("venue")!, label: "" } : null,
        genre: searchParams.get("genre") ? { value: searchParams.get("genre")!, label: "" } : null,
        startDate: searchParams.get("startDate") ? searchParams.get("startDate")! : START_DATE,
        endDate: searchParams.get("endDate") ? searchParams.get("endDate")! : END_DATE,
    });

    useEffect(() => {
        Promise.all([
            ApiService.get<City[]>("/cities"),
            ApiService.get<PageResponse<Venue>>("/venues"),
            ApiService.get<Genre[]>("/genres"),
        ])
            .then(([citiesResponse, venuesResponse, genresResponse]) => {

                // If form data got initial state from url param(s) then find it and set its label
                const cityOptions = citiesResponse.map(city => ({ value: city.id, label: city.name }));
                setCityOptions(cityOptions);

                if (formData.city?.value) {
                    const cityOption = cityOptions.find(city => city.value === formData.city!.value);
                    if (cityOption) setFormData(prev => ({ ...prev, city: cityOption }));
                }

                const venueOptions = venuesResponse.content.map(venue => ({ value: venue.id, label: venue.name }));
                setVenueOptions(venueOptions);

                if (formData.venue?.value) {
                    const venueOption = venueOptions.find(venue => venue.value === formData.venue!.value);
                    if (venueOption) setFormData(prev => ({ ...prev, venue: venueOption }));
                }

                const genreOptions = genresResponse.map(genre => ({ value: genre.id, label: genre.name }))
                setGenreOptions(genreOptions);

                if (formData.genre?.value) {
                    const genreOption = genreOptions.find(genre => genre.value === formData.genre!.value);
                    if (genreOption) setFormData(prev => ({ ...prev, genre: genreOption }));
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const updateSearchParams = (data: UpcomingMoviesFormData, pageNumber: number) => {

        const params: Record<string, string> = {
            page: pageNumber.toString(),
            size: PAGE_SIZE,
            startDate: formData.startDate,
            endDate: formData.endDate
        };
        if (data.title) params.title = data.title;
        if (data.city?.value) params.city = data.city.value;
        if (data.venue?.value) params.venue = data.venue.value;
        if (data.genre?.value) params.genre = data.genre.value;
        if (data.startDate) params.startDate = data.startDate;
        if (data.endDate) params.endDate = data.endDate;

        setSearchParams(params);
    };

    const fetchMovies = (data: UpcomingMoviesFormData, pageNumber: number) => {

        const params: Record<string, string | undefined | number> = {
            page: pageNumber,
            size: PAGE_SIZE,
            city: data.city?.value,
            venue: data.venue?.value,
            genre: data.genre?.value,
            startDate: data?.startDate,
            endDate: data?.endDate
        };
        if (data.title) {
            params.title = data.title;
        }

        ApiService.get<PageResponse<Movie>>("/movies", params)
            .then(response => {
                setMovies(prevMovies =>
                    pageNumber === 0 ? response.content : [...prevMovies, ...response.content]
                );
                setIsLastPage(response.last);
            })
            .catch(error => console.log(error));
    }

    const debouncedFetchMovies = debounce((data: UpcomingMoviesFormData) => {
        setPage(0);
        // Update formData for title changes
        setFormData(prevData => ({ ...prevData, title: data.title }));
        // Update searchParams with the new title value
        updateSearchParams({ ...formData, title: data.title }, 0);
        // Fetch movies with the updated title
        fetchMovies({ ...formData, title: data.title }, 0);
    }, 500);

    useEffect(() => {
        // Fetch immediately when non-title fields change
        setPage(0);
        updateSearchParams(formData, 0);
        fetchMovies(formData, 0);
    }, [formData.city, formData.venue, formData.genre, formData.startDate, formData.endDate, page]);

    useEffect(() => {
        // On title change call fetchMovies after 500ms
        debouncedFetchMovies(formData);
    }, [formData.title]);

    // Clean up debounced function on unmount
    useEffect(() => {
        return () => {
            debouncedFetchMovies.cancel();
        };
    }, [debouncedFetchMovies]);

    const handleChange = (name: string, value: string | SingleValue<SelectOptionType>) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleDateChange = (startDate: string, endDate: string) => {
        setFormData({ title: "", city: null, venue: null, genre: null, startDate: startDate, endDate: endDate });

        // Reset pagination to first page
        setPage(0);

        // Fetch movies with only the date filter applied
        fetchMovies({ title: "", city: null, venue: null, genre: null, startDate: startDate, endDate: endDate }, 0);
    }

    // Handle "Load More" button click to fetch the next page
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(formData, nextPage);
    };


    return (
        <>
            <h4 className="font-heading-h4 currently-showing-caption">Upcoming movies({movies.length})</h4>
            <UpcomingMoviesForm
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                formData={formData}
                cityOptions={cityOptions}
                genreOptions={genreOptions}
                venueOptions={venueOptions}
            />
            <UpcomingMoviesList movies={movies} />
            <div className="load-more-btn">
                <TertiaryButton label="Load More" size="large" onClick={handleLoadMore} />
            </div>
        </>
    )
}