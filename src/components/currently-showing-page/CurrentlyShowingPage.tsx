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
import { CurrentlyShowingFormData } from "../../types/FormData";
import debounce from "lodash.debounce";
import NoMoviesPreview from "../shared-components/no-movies-preview/NoMoviesPreview";
import { useSearchParams } from "react-router-dom";
import { City } from "../../types/City";
import { Genre } from "../../types/Genre";
import { Venue } from "../../types/Venue";
import { calculateDateString } from "../../utils/utils";
import LoadingIndicator from "../shared-components/loading-indicator/LoadingIndicator";
import { useQueryParams } from "../../custom-hooks/useQueryParams";

export default function CurrentlyShowingPage() {
    const { queryParams, setQueryParams } = useQueryParams();
    let [searchParams] = useSearchParams();
    let [movies, setMovies] = useState<Movie[]>([]);
    let [page, setPage] = useState(0); // Current page number
    let [isLastPage, setIsLastPage] = useState(false); // Track if we're on the last page
    let [isLoading, setIsLoading] = useState<boolean>(true);
    const PAGE_SIZE: string = "9";
    const END_DATE: string = calculateDateString(10);

    let [cityOptions, setCityOptions] = useState<SelectOptionType[]>();
    let [genreOptions, setGenreOptions] = useState<SelectOptionType[]>();
    let [venueOptions, setVenueOptions] = useState<SelectOptionType[]>();
    const [allVenues, setAllVenues] = useState<Venue[]>([]);
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

                setAllVenues(venuesResponse.content);
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

    useEffect(() => {
        if (formData.city?.value) {
            // Filter venues based on the selected city
            const filteredVenues = allVenues.filter(venue => venue.city.id === formData.city!.value);
            const filteredVenueOptions = filteredVenues.map(venue => ({
                value: venue.id,
                label: venue.name,
            }));
            setVenueOptions(filteredVenueOptions);
            setFormData(prev => ({ ...prev, venue: null })); // Reset venue selection
        } else {
            // Reset to show all venues if no city is selected
            const allVenueOptions = allVenues.map(venue => ({
                value: venue.id,
                label: venue.name,
            }));
            setVenueOptions(allVenueOptions);
        }
    }, [formData.city, allVenues]);

    const updateSearchParams = (data: CurrentlyShowingFormData, pageNumber: number): void => {

        const params: Record<string, string> = {
            page: pageNumber.toString(),
            size: PAGE_SIZE.toString(),
            date: data.date || END_DATE
        };
        if (data.title) params.title = data.title.trim().replace(/\s+/g, " ");
        if (data.city?.value) params.city = data.city.value;
        if (data.venue?.value) params.venue = data.venue.value;
        if (data.genre?.value) params.genre = data.genre.value;
        if (data.time?.value) params.time = data.time.value;

        setQueryParams(params);
    };

    useEffect(() => {
        // Sync query params with form data on mount
        setFormData(prev => ({
            ...prev,
            title: queryParams.title || "",
            city: queryParams.city ? { value: queryParams.city, label: "" } : null,
            venue: queryParams.venue ? { value: queryParams.venue, label: "" } : null,
            genre: queryParams.genre ? { value: queryParams.genre, label: "" } : null,
            time: queryParams.time ? { value: queryParams.time, label: "" } : null,
            date: queryParams.date || new Date().toISOString().split('T')[0],
        }));
    }, [queryParams]);

    const fetchMovies = (data: CurrentlyShowingFormData, pageNumber: number): void => {

        setIsLoading(true);
        const params: Record<string, string | undefined | number> = {
            page: pageNumber,
            size: PAGE_SIZE,
            date: data?.date,
            city: data.city?.value,
            venue: data.venue?.value,
            genre: data.genre?.value,
            time: data.time?.value,
        };
        if (data.title) {
            // Normalize the title by trimming spaces and replacing multiple spaces with a single space
            params.title = data.title.trim().replace(/\s+/g, " ");
        }

        ApiService.get<PageResponse<Movie>>("/movies/active", params)
            .then(response => {
                setMovies(prevMovies =>
                    pageNumber === 0 ? response.content : [...prevMovies, ...response.content]
                );
                setIsLastPage(response.last);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }

    const debouncedFetchMovies = debounce((data: CurrentlyShowingFormData): void => {
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
    }, [formData.city, formData.venue, formData.genre, formData.time, formData.date]);

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

    const handleChange = (name: string, value: string | SingleValue<SelectOptionType>): void => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleDateChange = (date: string): void => {
        setFormData({ title: "", city: null, venue: null, genre: null, time: null, date: date });

        // Reset pagination to first page
        setPage(0);

        // Fetch movies with only the date filter applied
        fetchMovies({ title: "", city: null, venue: null, genre: null, time: null, date: date }, 0);
    }

    // Handle "Load More" button click to fetch the next page
    const handleLoadMore = (): void => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(formData, nextPage);
    };

    return (
        isLoading ? (
            <LoadingIndicator />
        ) : (
            <>
                <h4 className="font-heading-h4 currently-showing-caption">Currently Showing{movies.length > 0 && ` (${movies.length})`}</h4>
                <CurrentlyShowingForm
                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
                    formData={formData}
                    cityOptions={cityOptions}
                    genreOptions={genreOptions}
                    venueOptions={venueOptions}
                    timeOptions={projectionTimeOptions} />
                <div className="font-md-italic-regular date-reminder">
                    Quick reminder that our cinema schedule is on a ten-day update cycle.
                </div>
                {movies.length === 0 ? (<NoMoviesPreview infoText="No movies to preview for current date" />) : (<MovieCardBigList movies={movies} />)}
                {/* Conditionally render the div with the button */}
                {!isLastPage && movies.length > 0 && (
                    <div className="load-more-btn">
                        <TertiaryButton label="Load More" size="large" onClick={handleLoadMore} />
                    </div>
                )}
            </>
        )
    )
}