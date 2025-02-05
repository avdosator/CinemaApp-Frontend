import "./BuyTicketPage.css"
import { Movie } from "../../../types/Movie"
import { ProjectionInstance } from "../../../types/ProjectionInstance"
import { Seat } from "../../../types/Seat"
import BookingSummary from "./booking-summary/BookingSummary"
import MakePayment from "./make-payment/MakePayment"
import { Projection } from "../../../types/Projection"
import { useEffect } from "react"

type BuyTicketPageProps = {
    projectionInstance: ProjectionInstance,
    movie: Movie,
    selectedSeats: Seat[],
    totalPrice: number,
    projection: Projection
}

export default function BuyTicketPage({ projectionInstance, movie, selectedSeats, totalPrice, projection }: BuyTicketPageProps) {
    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div className="buy-ticket-page">
            <MakePayment projectionInstance={projectionInstance} movie={movie} selectedSeats={selectedSeats} totalPrice={totalPrice} />
            <BookingSummary projectionInstance={projectionInstance} movie={movie} selectedSeats={selectedSeats} totalPrice={totalPrice} projection={projection} />
        </div>
    )
}