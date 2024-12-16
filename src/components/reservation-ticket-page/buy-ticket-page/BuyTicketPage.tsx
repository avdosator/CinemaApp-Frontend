import { Movie } from "../../../types/Movie"
import { ProjectionInstance } from "../../../types/ProjectionInstance"
import { Seat } from "../../../types/Seat"

type BuyTicketPageProps = {
    projection: ProjectionInstance,
    movie: Movie,
    selectedSeats: Seat[]
}

export default function BuyTicketPage({projection, movie, selectedSeats}: BuyTicketPageProps) {
    return (
        <div className="buy-ticket-page">

        </div>
    )
}