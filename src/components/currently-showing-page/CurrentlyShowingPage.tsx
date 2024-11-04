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

export default function CurrentlyShowingPage() {
    let [activeMoviesPage, setActiveMoviesPage] = useState<PageResponse<Movie> | null>(null);
    let [formData, setFormData] = useState<CurrentlyShowingFormData>({ title: "", city: null, venue: null, genre: null, time: null, date: "" });

    const fetchMovies = (data: CurrentlyShowingFormData) => {
        const today = new Date();
        const params: Record<string, string | undefined | number> = {
            page: 0,
            size: 9,
            startDate: today.toISOString().split('T')[0],
            endDate: new Date(today.setDate(today.getDate() + 9)).toISOString().split('T')[0],
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
            .then(response => setActiveMoviesPage(response))
            .catch(error => console.log(error));
    }

    const debouncedFetchMovies = debounce(fetchMovies, 500);

    useEffect(() => {
        // Fetch immediately when non-title fields change
        fetchMovies(formData);
    }, [formData.city, formData.venue, formData.genre, formData.time, formData.date]);

    useEffect(() => {
        // On title change call fetchMovies after 500ms
        if (formData.title) {
            debouncedFetchMovies(formData);
        }
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
        setFormData((prevData) => ({
            ...prevData,
            date: date
        }));
    }
    return (
        <>
            <h4 className="font-heading-h4 currently-showing-caption">Currently showing(9)</h4>
            <CurrentlyShowingForm handleChange={handleChange} handleDateChange={handleDateChange} formData={formData} />
            <div className="font-md-italic-regular date-reminder">
                Quick reminder that our cinema schedule is on a ten-day update cycle.
            </div>
            <MovieCardBigList />
            <div className="load-more-btn">
                <TertiaryButton label="Load More" size="large" />
            </div>
        </>
    )
}