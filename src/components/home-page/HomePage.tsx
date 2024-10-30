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

const movies: Movie[] = [
    {
        id: "1", title: "Avatar12345678910111213145", durationInMinutes: 117, genres: [{ id: "1", name: "Fantasy" }], projections: [{ id: "1", status: "active" }],
        synopsis: ""
    },
    {
        id: "2", title: "Kreator", durationInMinutes: 110, genres: [{ id: "7", name: "Horror" }], projections: [{ id: "2", status: "upcoming" }],
        synopsis: ""
    },
    {
        id: "3", title: "Gori vatra", durationInMinutes: 126, genres: [{ id: "2", name: "Action" }], projections: [{ id: "3", status: "active" }],
        synopsis: ""
    },
    {
        id: "4", title: "Rebel Moon", durationInMinutes: 135, genres: [{ id: "3", name: "Drama" }], projections: [{ id: "4", status: "active" }],
        synopsis: ""
    },
    {
        id: "5", title: "Captain Phillips", durationInMinutes: 120, genres: [{ id: "4", name: "Action" }], projections: [{ id: "5", status: "upcoming" }],
        synopsis: ""
    },
    {
        id: "6", title: "Bad boys 2", durationInMinutes: 140, genres: [{ id: "5", name: "Action" }], projections: [{ id: "6", status: "upcoming" }],
        synopsis: ""
    },
    {
        id: "7", title: "Avatar 2", durationInMinutes: 110, genres: [{ id: "6", name: "Fantasy" }], projections: [{ id: "7", status: "active" }],
        synopsis: ""
    },
];

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
            <CardList heading="Currently showing" elements={activeMovies} CardComponent={MovieCard} />
            <CardList heading="Upcoming movies" elements={upcomingMovies} CardComponent={MovieCard} />
            <CardList heading="Venues" elements={venues} CardComponent={VenueCard} />
        </>
    )
}