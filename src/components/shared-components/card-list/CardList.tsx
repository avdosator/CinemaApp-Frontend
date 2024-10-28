import { CardListProps } from "../../../types/CardListType"
import "../../shared-components/card/SharedCard.css"
import MovieCard from "../card/movie-card/MovieCard";
import VenueCard from "../card/venue-card/VenueCard";
import PaginationSmall from "../pagination/PaginationSmall"
import "./CardList.css"

// type CardListProps = {
//     heading: string,
//     items: React.ReactNode[]
// }

export default function CardList({ elements }: CardListProps) {
    const { heading, movies, venues } = elements;
    return (
        <>
            <div className="card-list-container">
                <div className="card-list-wrapper">
                    <section className="card-list-content">
                        <div className="card-list-heading">
                            <h2 className="font-heading-h4">{heading}</h2>
                            <a className="font-lg-semibold" href="">See All</a>
                        </div>
                        <div className="card-list">
                            {movies &&
                                movies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            {venues &&
                                venues.map((venue) => (
                                    <VenueCard key={venue.id} venue={venue} />
                                ))}
                        </div>
                    </section>
                    <div className="pagination-sm-container">
                        <PaginationSmall />
                    </div>
                </div>
            </div>
        </>
    )
}