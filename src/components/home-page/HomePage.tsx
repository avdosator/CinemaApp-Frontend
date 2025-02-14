import { useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import { Venue } from "../../types/Venue";
import CardList from "../shared-components/card-list/CardList";
import MovieCard from "../shared-components/card/movie-card/MovieCard";
import VenueCard from "../shared-components/card/venue-card/VenueCard";
import FeaturedMovieCarousel from "./featured-movie-carousel/FeaturedMovieCarousel";
import VenuePillList from "./venue-bar/VenuePillList";
import ApiService from "../../service/ApiService";
import { PageResponse } from "../../types/PageResponse";
import LoadingIndicator from "../shared-components/loading-indicator/LoadingIndicator";

export default function HomePage() {
    const [activeMovies, setActiveMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);
    let [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            ApiService.get<PageResponse<Movie>>("/movies/active"),
            ApiService.get<PageResponse<Movie>>("/movies/upcoming"),
            ApiService.get<PageResponse<Venue>>("/venues")
        ])
            .then(([activeMoviesPage, upcomingMoviesPage, venuesPage]) => {
                setIsLoading(true);
                setActiveMovies(activeMoviesPage.content);
                setUpcomingMovies(upcomingMoviesPage.content);
                setVenues(venuesPage.content);
                setIsLoading(false);
            });
    }, [])
    return (
        isLoading ? (
            <LoadingIndicator />
        ) : (
            <>
                <FeaturedMovieCarousel movies={activeMovies.slice(0, 3)} />
                <VenuePillList />
                <CardList heading="Currently Showing" elements={activeMovies} route="/movies/currently-showing" CardComponent={MovieCard} />
                <CardList heading="Upcoming Movies" elements={upcomingMovies} route="/movies/upcoming" CardComponent={MovieCard} />
                <CardList heading="Venues" elements={venues} route="/venues" CardComponent={VenueCard} />
            </>
        )

    )
}