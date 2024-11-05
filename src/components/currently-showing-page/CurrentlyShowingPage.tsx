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
import { useNavigate } from "react-router-dom";

export default function CurrentlyShowingPage() {
    const navigate = useNavigate();
    let [movies, setMovies] = useState<Movie[]>([]);
    let [formData, setFormData] = useState<CurrentlyShowingFormData>({ title: "", city: null, venue: null, genre: null, time: null, date: new Date().toISOString().split('T')[0] });
    let [page, setPage] = useState(0); // Current page number
    let [isLastPage, setIsLastPage] = useState(false); // Track if we're on the last page
    const PAGE_SIZE: number = 9;

    const fetchMovies = (data: CurrentlyShowingFormData, pageNumber: number) => {
        const today = new Date();
        const startDate = today.toISOString().split('T')[0];
        const endDate = new Date(today.setDate(today.getDate() + 9)).toISOString().split('T')[0];

        const params: Record<string, string | undefined | number> = {
            page: pageNumber,
            size: PAGE_SIZE,
            startDate: startDate,
            endDate: endDate,
            city: data.city?.value,
            venue: data.venue?.value,
            genre: data.genre?.value,
            time: data.time?.value,
            date: data?.date
        };
        if (data.title) {
            params.title = data.title;
        }

        // Convert params object to URL search params for ApiService and URL update
        const urlParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) urlParams.append(key, value.toString());
        });

        // Update the URL in the address bar
        navigate(`/currently-showing?${urlParams.toString()}`, { replace: true });

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
        // Reset to the first page when search parameters change
        setPage(0);
        fetchMovies(data, 0);
    }, 500);

    useEffect(() => {
        // Fetch immediately when non-title fields change
        setPage(0);
        fetchMovies(formData, 0);
    }, [formData.city, formData.venue, formData.genre, formData.time, formData.date, page]);

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
            <h4 className="font-heading-h4 currently-showing-caption">Currently showing{movies.length !== 0 ? `(${movies.length})` : "(0)"}</h4>
            <CurrentlyShowingForm handleChange={handleChange} handleDateChange={handleDateChange} formData={formData} />
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