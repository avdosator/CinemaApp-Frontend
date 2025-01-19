import { useEffect, useState } from "react";
import { Movie } from "../../types/Movie"
import ApiService from "../../service/ApiService";
import { PageResponse } from "../../types/PageResponse";
import UpcomingMoviesList from "./upcoming-movies-list/UpcomingMoviesList";
import TertiaryButton from "../shared-components/buttons/TertiaryButton";
import { SelectOptionType } from "../../types/SelectOptionType";
import { calculateDateString } from "../../utils/utils";
import { useSearchParams } from "react-router-dom";
import { UpcomingMoviesFormData } from "../../types/FormData";
import { Genre } from "../../types/Genre";
import { City } from "../../types/City";
import { Venue } from "../../types/Venue";
import debounce from "lodash.debounce";
import { SingleValue } from "react-select";
import UpcomingMoviesForm from "./upcoming-movies-form/UpcomingMoviesForm";
import NoMoviesPreview from "../shared-components/no-movies-preview/NoMoviesPreview";
import { format } from "date-fns";
import LoadingIndicator from "../shared-components/loading-indicator/LoadingIndicator";

export default function UpcomingMoviesPage() {
    let [searchParams, setSearchParams] = useSearchParams();
    let [movies, setMovies] = useState<Movie[]>([]);
    let [page, setPage] = useState<number>(0);
    let [isLastPage, setIsLastPage] = useState<boolean>(false);
    let [isLoading, setIsLoading] = useState<boolean>(true);
    const PAGE_SIZE: string = "12";
    const START_DATE: string = calculateDateString(1);
    const END_DATE: string = calculateDateString(200);

    let [cityOptions, setCityOptions] = useState<SelectOptionType[]>();
    let [genreOptions, setGenreOptions] = useState<SelectOptionType[]>();
    let [venueOptions, setVenueOptions] = useState<SelectOptionType[]>();

    let [formData, setFormData] = useState<UpcomingMoviesFormData>({
        title: searchParams.get("title") || "",
        city: searchParams.get("city") ? { value: searchParams.get("city")!, label: "" } : null,
        venue: searchParams.get("venue") ? { value: searchParams.get("venue")!, label: "" } : null,
        genre: searchParams.get("genre") ? { value: searchParams.get("genre")!, label: "" } : null,
        startDate: searchParams.get("startDate") ? searchParams.get("startDate")! : "",
        endDate: searchParams.get("startDate") ? searchParams.get("endDate")! : ""
    });

    // Determine the initial `formattedDateRange` to pass to `UpcomingMoviesForm`
    const initialFormattedDateRange = formData.startDate && formData.endDate ?
        `${format(new Date(formData.startDate), 'yyyy/MM/dd')} - ${format(new Date(formData.endDate), 'yyyy/MM/dd')}` : "";

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
            startDate: data.startDate || START_DATE,
            endDate: data.endDate || END_DATE
        };
        if (data.title) params.title = data.title.trim().replace(/\s+/g, " ");
        if (data.city?.value) params.city = data.city.value;
        if (data.venue?.value) params.venue = data.venue.value;
        if (data.genre?.value) params.genre = data.genre.value;
        setSearchParams(params);
    };

    const fetchMovies = (data: UpcomingMoviesFormData, pageNumber: number) => {

        setIsLoading(true);
        const params: Record<string, string | undefined | number> = {
            page: pageNumber,
            size: PAGE_SIZE,
            startDate: data.startDate || START_DATE,
            endDate: data.endDate || END_DATE,
            city: data.city?.value,
            venue: data.venue?.value,
            genre: data.genre?.value,
        };
        if (data.title) {
            params.title = data.title.trim().replace(/\s+/g, " ");
        }

        ApiService.get<PageResponse<Movie>>("/movies/upcoming", params)
            .then(response => {
                setMovies(prevMovies =>
                    pageNumber === 0 ? response.content : [...prevMovies, ...response.content]
                );
                setIsLastPage(response.last);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }

    const debouncedFetchMovies = debounce((data: UpcomingMoviesFormData) => {
        const trimmedTitle = data.title.trim();
        if (trimmedTitle === "") {
            // Clear the title filter if the input is only spaces
            setFormData(prevData => ({ ...prevData, title: "" }));
            updateSearchParams({ ...formData, title: "" }, 0);
            fetchMovies({ ...formData, title: "" }, 0);
            return;
        }
        setPage(0);
        // Update formData for title changes
        setFormData(prevData => ({ ...prevData, title: trimmedTitle }));
        // Update searchParams with the new title value
        updateSearchParams({ ...formData, title: trimmedTitle }, 0);
        // Fetch movies with the updated title
        fetchMovies({ ...formData, title: trimmedTitle }, 0);
    }, 500);

    useEffect(() => {
        // Fetch immediately when non-title fields change
        setPage(0);
        updateSearchParams(formData, 0);
        fetchMovies(formData, 0);
    }, [formData.city, formData.venue, formData.genre, formData.startDate, formData.endDate]);

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

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(formData, nextPage);
    };

    return (
        isLoading ? (
            <LoadingIndicator />
        ) : (
            <>
                <h4 className="font-heading-h4 currently-showing-caption">Upcoming movies({movies.length})</h4>
                <UpcomingMoviesForm
                    handleChange={handleChange}
                    formData={formData}
                    cityOptions={cityOptions}
                    genreOptions={genreOptions}
                    venueOptions={venueOptions}
                    initialFormattedDateRange={initialFormattedDateRange}

                />
                {movies.length === 0 ? (<NoMoviesPreview infoText="No movies to preview for current date range" />) : (<UpcomingMoviesList movies={movies} />)}
                {!isLastPage && movies.length > 0 && (
                    <div className="load-more-btn">
                        <TertiaryButton label="Load More" size="large" onClick={handleLoadMore} />
                    </div>
                )}
            </>
        )
    )
}