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

export default function HomePage() {
    const [activeMovies, setActiveMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);

    useEffect(() => {
        ApiService.get<PageResponse<Movie>>("/movies/active").then(response => setActiveMovies(response.content));
        ApiService.get<PageResponse<Movie>>("/movies/upcoming").then(response => setUpcomingMovies(response.content));
        ApiService.get<PageResponse<Venue>>("/venues").then(response => {console.log(response); setVenues(response.content)});
    }, [])
    return (
        <>
            <FeaturedMovieCarousel movies={activeMovies.slice(0, 3)} />
            <VenuePillList />
            <CardList heading="Currently showing" elements={activeMovies} route="/currently-showing" CardComponent={MovieCard} />
            <CardList heading="Upcoming movies" elements={upcomingMovies} route="/upcoming-movies" CardComponent={MovieCard} />
            <CardList heading="Venues" elements={venues} route="/venues" CardComponent={VenueCard} />
        </>
    )
}