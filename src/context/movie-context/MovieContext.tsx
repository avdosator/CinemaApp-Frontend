import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { PageResponse } from "../../types/PageResponse"
import { Movie } from "../../types/Movie"
import ApiService from "../../service/ApiService";

const MovieContext = createContext<PageResponse<Movie> | undefined>(undefined);

export default function MovieProvider({ children }: { children: ReactNode }) {
    let [movies, setMovies] = useState<PageResponse<Movie> | undefined>(undefined);

    useEffect(() => {
        ApiService.get<PageResponse<Movie>>("/movies/active")
            .then(response => setMovies(response))
            .catch(error => console.error("Error fetching data:", error));
    }, [])

    return (
        <MovieContext.Provider value= { movies } >
        { children }
        </MovieContext.Provider >
    )
}

export function useMovies(): PageResponse<Movie> | undefined {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error("useMovies must be used within a CategoryProvider");
    }
    return context;
}