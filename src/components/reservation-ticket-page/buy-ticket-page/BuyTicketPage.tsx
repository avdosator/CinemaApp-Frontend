import { Movie } from "../../../types/Movie"
import { ProjectionInstance } from "../../../types/ProjectionInstance"
import { Seat } from "../../../types/Seat"
import BookingSummary from "../booking-summary/BookingSummary"

type BuyTicketPageProps = {
    projection: ProjectionInstance,
    movie: Movie,
    selectedSeats: Seat[]
}

export default function BuyTicketPage({projection, movie, selectedSeats}: BuyTicketPageProps) {
    return (
        <div className="buy-ticket-page">
            <BookingSummary projection={projection} movie={movie} selectedSeats={selectedSeats} />
        </div>
    )
}