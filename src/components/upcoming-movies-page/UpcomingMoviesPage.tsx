import { useEffect, useState } from "react";
import { Movie } from "../../types/Movie"
import ApiService from "../../service/ApiService";
import { PageResponse } from "../../types/PageResponse";
import UpcomingMoviesList from "./upcoming-movies-list/UpcomingMoviesList";
import TertiaryButton from "../shared-components/buttons/TertiaryButton";

export default function UpcomingMoviesPage() {
    let [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        ApiService.get<PageResponse<Movie>>("/movies/upcoming")
            .then(response => (setMovies(response.content)))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <UpcomingMoviesList movies={movies} />
            <div className="load-more-btn">
                <TertiaryButton label="Load More" size="large" />
            </div>
        </>
    )
}