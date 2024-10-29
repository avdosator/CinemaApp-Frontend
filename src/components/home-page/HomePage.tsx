import { MovieCardType } from "../../types/MovieCardType";
import { VenueCardType } from "../../types/VenueCardType";
import CardList from "../shared-components/card-list/CardList";
import FeaturedMovieCarousel from "./featured-movie-carousel/FeaturedMovieCarousel";
import VenuePillList from "./venue-bar/VenuePillList";

const movies: MovieCardType[] = [
    { id: "1", title: "Avatar12345678910111213145", duration: 117, genre: "Fantasy" },
    { id: "2", title: "Kreator", duration: 120, genre: "Fantasy" },
    { id: "3", title: "Rebel Moon", duration: 140, genre: "Thriller" },
    { id: "4", title: "Gori vatra", duration: 113, genre: "Sci-Fi" },
    { id: "5", title: "Captain Phillips", duration: 124, genre: "Drama" },
    { id: "6", title: "Bad boys 2", duration: 135, genre: "Action" },
];

const venues: VenueCardType[] = [
    { id: "1", name: "Cineplex", street: "Zmaja od Bosne", streetNumber: "20", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-225-883" },
    { id: "2", name: "Meeting Point", street: "Obala Kulina Bana", streetNumber: "12", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-555-555" },
    { id: "3", name: "Kinoteka", street: "Branilaca Sarajeva", streetNumber: "45", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-666-666" },
    { id: "4", name: "Cinema City", street: "Marsala Tita", streetNumber: "10", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-777-777" },
];

export default function HomePage() {
    return (
        <>
            <FeaturedMovieCarousel />
            <VenuePillList/>
            <CardList elements={{heading:"Currently showing", movies: movies}} />
            <CardList elements={{heading: "Upcoming movies", movies: movies}} />
            <CardList elements={{heading: "Venues", venues: venues}} />
        </>
    )
}