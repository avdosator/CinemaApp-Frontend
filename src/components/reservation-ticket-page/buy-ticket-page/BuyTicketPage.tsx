import "./BuyTicketPage.css"
import { Movie } from "../../../types/Movie"
import { ProjectionInstance } from "../../../types/ProjectionInstance"
import { Seat } from "../../../types/Seat"
import BookingSummary from "./booking-summary/BookingSummary"
import MakePayment from "./make-payment/MakePayment"

type BuyTicketPageProps = {
    projection: ProjectionInstance,
    movie: Movie,
    selectedSeats: Seat[]
}

export default function BuyTicketPage({projection, movie, selectedSeats}: BuyTicketPageProps) {
    return (
        <div className="buy-ticket-page">
            <MakePayment/>
            <BookingSummary projection={projection} movie={movie} selectedSeats={selectedSeats} />
        </div>
    )
}