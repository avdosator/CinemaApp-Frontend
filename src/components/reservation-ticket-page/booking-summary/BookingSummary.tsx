import "./BookingSummary.css"
import { Movie } from "../../../types/Movie"
import { ProjectionInstance } from "../../../types/ProjectionInstance"
import { Seat } from "../../../types/Seat"
import { Venue } from "../../../types/Venue"
import { calculateReservedSeatsPrice } from "../../../utils/utils"
import VerticalLine from "../../shared-components/divider/VerticalLine"

type BookingSummaryProps = {
    projection: ProjectionInstance,
    movie: Movie,
    selectedSeats: Seat[]
}

export default function BookingSummary({ projection, movie, selectedSeats }: BookingSummaryProps) {

    const venue: Venue = projection.projection.hall.venue;
    const date = new Date(projection.date);
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const totalPrice: number = calculateReservedSeatsPrice(selectedSeats);
    return (
        <div className="booking-summary-container">
            <div className="booking-summary-movie-details">
                <div className="booking-summary-photo-container">
                    <img src={movie.photos[0].url} alt="" />
                </div>
                <div className="booking-summary-movie-info">
                    <h6 className="font-heading-h6" style={{color: "#FCFCFD"}}>{movie.title}</h6>
                    <div className="font-lg-regular booking-summary-basic-movie-info">
                        <span>{movie.pgRating}</span>
                        <VerticalLine width="0.5px" />
                        <span>{movie.language}</span>
                        <VerticalLine width="0.5px" />
                        <span>{`${movie.durationInMinutes} Min`}</span>
                    </div>
                </div>
            </div>
            <div className="full-width-horizontal-line"></div>
            <div className="booking-summary-projection-details">
                <div className="font-lg-regular booking-summary-heading">Date and Time</div>
                <div className="font-lg-semibold booking-summary-info">{formattedDate} at {projection.time}</div>
                <div className="font-lg-regular booking-summary-heading">Cinema Details</div>
                <div className="font-lg-semibold booking-summary-info">{venue.name}, {venue.street} {venue.streetNumber}, {venue.city.name} {venue.city.postalCode}</div>
                <div className="font-lg-semibold booking-summary-info">{projection.projection.hall.name}</div>
                <div className="font-lg-regular booking-summary-heading">Seat(s) Details</div>
                <div className="font-lg-semibold booking-summary-info">H1,H2</div>
                <div className="font-lg-regular booking-summary-heading">Price Details</div>
                <div className="font-lg-semibold booking-summary-info">{totalPrice}</div>
            </div>
        </div>
    )
}