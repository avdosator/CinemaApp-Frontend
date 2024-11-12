import { useEffect, useState } from "react";
import MovieCardSmall from "../../shared-components/card/movie-card-small/MovieCardSmall";
import { Movie } from "../../../types/Movie";
import ApiService from "../../../service/ApiService";
import { PageResponse } from "../../../types/PageResponse";

export default function MovieCardSmallList() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        ApiService.get<PageResponse<Movie>>("/movies/active")
            .then(response => setMovies(response.content))
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    return (
        <div className="movie-card-small-container">
            <h5 className="font-heading-h6" style={{ color: "#1D2939" }}>See also</h5>
            <div className="movie-card-small-list">
                <MovieCardSmall />
                <MovieCardSmall />
                <MovieCardSmall />
                <MovieCardSmall />
            </div>
            {/* <PaginationSmall /> */}
        </div>
    )
}