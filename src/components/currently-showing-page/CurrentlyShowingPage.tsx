import "./CurrentlyShowingPage.css"
import MovieCardBigList from "./movie-card-big-list/MovieCardBigList";
import CurrentlyShowingForm from "./currently-showing-form/CurrentlyShowingForm";
import TertiaryButton from "../shared-components/buttons/TertiaryButton";
import { useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import ApiService from "../../service/ApiService";
import { SelectOptionType } from "../../types/SelectOptionType";
import { SingleValue } from "react-select";
import { PageResponse } from "../../types/PageResponse";
import { CurrentlyShowingFormData } from "../../types/CurrentlyShowingFormData";
import debounce from "lodash.debounce";
import NoMoviesPreview from "../shared-components/no-movies-preview/NoMoviesPreview";
import { useSearchParams } from "react-router-dom";
import { City } from "../../types/City";
import { Genre } from "../../types/Genre";
import { Venue } from "../../types/Venue";
import { calculateDateString } from "../../utils/utils";

export default function CurrentlyShowingPage() {
    let [searchParams, setSearchParams] = useSearchParams();
    let [movies, setMovies] = useState<Movie[]>([]);
    let [page, setPage] = useState(0); // Current page number
    let [isLastPage, setIsLastPage] = useState(false); // Track if we're on the last page
    const PAGE_SIZE: number = 9;
    const START_DATE: string = calculateDateString(0);
    const END_DATE: string = calculateDateString(9);

    let [cityOptions, setCityOptions] = useState<SelectOptionType[]>();
    let [genreOptions, setGenreOptions] = useState<SelectOptionType[]>();
    let [venueOptions, setVenueOptions] = useState<SelectOptionType[]>();
    let [projectionTimeOptions, setProjectionTimeOptions] = useState<SelectOptionType[]>();

    // set initial form state from url params
    let [formData, setFormData] = useState<CurrentlyShowingFormData>({
        title: searchParams.get("title") || "",
        city: searchParams.get("city") ? { value: searchParams.get("city")!, label: "" } : null,
        venue: searchParams.get("venue") ? { value: searchParams.get("venue")!, label: "" } : null,
        genre: searchParams.get("genre") ? { value: searchParams.get("genre")!, label: "" } : null,
        time: searchParams.get("time") ? { value: searchParams.get("time")!, label: "" } : null,
        date: searchParams.get("date") || new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        Promise.all([
            ApiService.get<City[]>("/cities"),
            ApiService.get<PageResponse<Venue>>("/venues"),
            ApiService.get<Genre[]>("/genres"),
            ApiService.get<string[]>("projections/start-times")
        ])
            .then(([citiesResponse, venuesResponse, genresResponse, projectionsTimesResponse]) => {

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

                const projectionTimeOptions = projectionsTimesResponse.map(projectionTime => ({ value: projectionTime, label: projectionTime }))
                setProjectionTimeOptions(projectionTimeOptions);

                if (formData.time?.value) {
                    const projectionOption = projectionTimeOptions.find(projection => projection.value === formData.time!.value);
                    if (projectionOption) setFormData(prev => ({ ...prev, time: projectionOption }));
                }

                setProjectionTimeOptions(projectionsTimesResponse.map(projection => ({ value: projection, label: projection })));
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const updateSearchParams = (data: CurrentlyShowingFormData, pageNumber: number) => {

        const params: Record<string, string> = {
            page: pageNumber.toString(),
            size: PAGE_SIZE.toString(),
            START_DATE,
            END_DATE
        };
        if (data.title) params.title = data.title;
        if (data.city?.value) params.city = data.city.value;
        if (data.venue?.value) params.venue = data.venue.value;
        if (data.genre?.value) params.genre = data.genre.value;
        if (data.time?.value) params.time = data.time.value;
        if (data.date) params.date = data.date;

        setSearchParams(params);
    };

    const fetchMovies = (data: CurrentlyShowingFormData, pageNumber: number) => {

        const params: Record<string, string | undefined | number> = {
            page: pageNumber,
            size: PAGE_SIZE,
            startDate: START_DATE,
            endDate: END_DATE,
            city: data.city?.value,
            venue: data.venue?.value,
            genre: data.genre?.value,
            time: data.time?.value,
            date: data?.date
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

    const debouncedFetchMovies = debounce((data: CurrentlyShowingFormData) => {
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
    }, [formData.city, formData.venue, formData.genre, formData.time, formData.date, page]);

    useEffect(() => {
        // On title change call fetchMovies after 500ms
<<<<<<< HEAD
        debouncedFetchMovies(formData);
=======
            debouncedFetchMovies(formData);
        
>>>>>>> 90ef9cf (Use movies length for number in heading and hide Load More button if movies array is empty)
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

    const handleDateChange = (date: string) => {
        setFormData({ title: "", city: null, venue: null, genre: null, time: null, date: date });

        // Reset pagination to first page
        setPage(0);

        // Fetch movies with only the date filter applied
        fetchMovies({ title: "", city: null, venue: null, genre: null, time: null, date: date }, 0);
    }

    // Handle "Load More" button click to fetch the next page
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(formData, nextPage);
    };

    return (
        <>
<<<<<<< HEAD
            <h4 className="font-heading-h4 currently-showing-caption">Currently showing{movies.length !== 0 ? `(${movies.length})` : "(0)"}</h4>
            <CurrentlyShowingForm
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                formData={formData}
                cityOptions={cityOptions}
                genreOptions={genreOptions}
                venueOptions={venueOptions}
                timeOptions={projectionTimeOptions} />
=======
            <h4 className="font-heading-h4 currently-showing-caption">Currently showing{movies.length !== 0 ? `(${movies.length})` : ""}</h4>
            <CurrentlyShowingForm handleChange={handleChange} handleDateChange={handleDateChange} formData={formData} />
>>>>>>> 90ef9cf (Use movies length for number in heading and hide Load More button if movies array is empty)
            <div className="font-md-italic-regular date-reminder">
                Quick reminder that our cinema schedule is on a ten-day update cycle.
            </div>
            {movies.length === 0 ? (<NoMoviesPreview />) : (<MovieCardBigList movies={movies} />)}
            {/* Conditionally render the div with the button */}
            {!isLastPage && movies.length > 0 && (
                <div className="load-more-btn">
                    <TertiaryButton label="Load More" size="large" onClick={handleLoadMore} />
                </div>
            )}
        </>
    )
}