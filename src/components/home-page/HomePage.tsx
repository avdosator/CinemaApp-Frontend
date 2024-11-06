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

const venues: Venue[] = [
    { id: "1", name: "Cineplex", street: "Zmaja od Bosne", streetNumber: "20", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-225-883" },
    { id: "2", name: "Meeting Point", street: "Obala Kulina Bana", streetNumber: "12", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-555-555" },
    { id: "3", name: "Kinoteka", street: "Branilaca Sarajeva", streetNumber: "45", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-666-666" },
    { id: "4", name: "Cinema City", street: "Marsala Tita", streetNumber: "10", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-777-777" },
];

export default function HomePage() {
    const [activeMovies, setActiveMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    //const [venues, setVenues] = useState<Venue[]>([]);

    useEffect(() => {
        ApiService.get<PageResponse<Movie>>("/movies/active").then(response => setActiveMovies(response.content));
        ApiService.get<PageResponse<Movie>>("/movies/upcoming").then(response => setUpcomingMovies(response.content));
        //ApiService.get<PageResponse<Venue>>("/movies/active").then(response => setVenues(response.content));
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