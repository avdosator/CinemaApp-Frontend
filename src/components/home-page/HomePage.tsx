import CardList from "../shared-components/card-list/CardList";
import MovieCard from "../shared-components/card/movie-card/MovieCard";
import VenueCard from "../shared-components/card/venue-card/VenueCard";


const movies = [
    <MovieCard movie={{ id: "1", title: "Avatar", duration: 117, genre: "Fantasy" }} />,
    <MovieCard movie={{ id: "2", title: "Kreator", duration: 120, genre: "Fantasy" }} />,
    <MovieCard movie={{ id: "3", title: "Rebel Moon", duration: 140, genre: "Thriller" }} />,
    <MovieCard movie={{ id: "4", title: "Napoleon", duration: 155, genre: "Epic" }} />,
];

const venues = [
    <VenueCard venue={{ id: "1", name: "Cineplex", street: "Zmaja od Bosne", streetNumber: "20", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-225-883" }} />,
    <VenueCard venue={{ id: "2", name: "Meeting Point", street: "Obala Kulina Bana", streetNumber: "12", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-555-555" }} />,
    <VenueCard venue={{ id: "3", name: "Kinoteka", street: "Branilaca Sarajeva", streetNumber: "45", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-666-666" }} />,
    <VenueCard venue={{ id: "4", name: "Cinema City", street: "Marsala Tita", streetNumber: "10", city: { id: "1", name: "Sarajevo", postalCode: 71000, country: "BiH" }, phone: "033-777-777" }} />,
];

export default function HomePage() {
    return (
        <>
            <CardList heading="Currently showing" items={movies} />
            <CardList heading="Upcoming movies" items={movies} />
            <CardList heading="Venues" items={venues} />
        </>
    )
}