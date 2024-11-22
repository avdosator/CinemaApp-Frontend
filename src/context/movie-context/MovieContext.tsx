import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { PageResponse } from "../../types/PageResponse"
import { Movie } from "../../types/Movie"
import ApiService from "../../service/ApiService";

const ActiveMoviesContext = createContext<Movie[] | undefined>(undefined);

export default function MovieProvider({ children }: { children: ReactNode }) {
    let [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        ApiService.get<PageResponse<Movie>>("/movies/active")
            .then(response => setMovies(response.content))
            .catch(error => console.error("Error fetching data:", error));
    }, [])

    return (
        <ActiveMoviesContext.Provider value={movies} >
            {children}
        </ActiveMoviesContext.Provider >
    )
}

export function useActiveMovies(): Movie[] | undefined {
    const context = useContext(ActiveMoviesContext);
    if (context === undefined) {
        throw new Error("useMovies must be used within a CategoryProvider");
    }
    return context;
}