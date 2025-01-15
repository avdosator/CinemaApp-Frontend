import "./BuyTicketPage.css"
import { Movie } from "../../../types/Movie"
import { ProjectionInstance } from "../../../types/ProjectionInstance"
import { Seat } from "../../../types/Seat"
import BookingSummary from "./booking-summary/BookingSummary"
import MakePayment from "./make-payment/MakePayment"

type BuyTicketPageProps = {
    projection: ProjectionInstance,
    movie: Movie,
    selectedSeats: Seat[],
    totalPrice: number
}

export default function BuyTicketPage({ projection, movie, selectedSeats, totalPrice }: BuyTicketPageProps) {
    return (
        <div className="buy-ticket-page">
            <MakePayment projection={projection} movie={movie} selectedSeats={selectedSeats} totalPrice={totalPrice} />
            <BookingSummary projection={projection} movie={movie} selectedSeats={selectedSeats} totalPrice={totalPrice} />
        </div>
    )
}