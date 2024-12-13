import { Venue } from "../../types/Venue";
import VerticalLine from "../shared-components/divider/VerticalLine";
import SeatGuide from "./seat-guide/SeatGuide";
import SeatSchema from "./seat-schema/SeatSchema";
import "./SeatReservationPage.css"
import { useLocation } from "react-router-dom";

export default function SeatReservationPage() {
    const location = useLocation();
    const { projectionInstance, movie } = location.state;
    const venue: Venue = projectionInstance.projection.hall.venue;

    const date = new Date(projectionInstance.date);
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return (
        <div className="seat-reservation-container">
            <div className="seat-reservation-heading-container">
                <h5 className="font-heading-h5 seat-options-heading">Seat Options</h5>
                <div className="session-duration-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={24} fill="#1D2939" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                    <div className="font-lg-regular session-duration-text">Session Duration</div>
                    <div className="session-duration-counter font-heading-h6">04:59</div>
                </div>
                <div className="session-duration-info font-sm-regular">
                    Session will expire in 5 minutes <br />and selected seats will be refreshed
                </div>
            </div>
            <div className="seat-reservation-horizontal-line"></div>
            <div className="seat-reservation-movie-container">
                <div className="seat-reservation-movie-img-container">
                    <img src={movie.photos[0].url} alt="" />
                </div>
                <div className="seat-reservation-movie-info">
                    <h6 className="font-heading-h6">{movie.title}</h6>
                    <div className="font-lg-regular basic-movie-info">
                        <span>{movie?.pgRating}</span>
                        <VerticalLine width="0.5px" />
                        <span>{movie?.language}</span>
                        <VerticalLine width="0.5px" />
                        <span>{`${movie?.durationInMinutes} Min`}</span>
                    </div>
                </div>
                <div className="seat-reservation-booking-info font-lg-regular">
                    <h6 className="font-heading-h6">Booking Details</h6>
                    <div className="font-lg-regular">{formattedDate} at {projectionInstance.time}</div>
                    <div className="font-lg-regular">{venue.name}, {venue.street} {venue.streetNumber}, {venue.city.name} {venue.city.postalCode}</div>
                    <div className="font-lg-regular">{projectionInstance.projection.hall.name}</div>
                </div>
            </div>
            <div className="seat-reservation-horizontal-line"></div>
            <div className="seat-reservation-ticket-container">
                <SeatSchema hallId={projectionInstance.projection.hall.id} />
                <div className="seat-reservation-right-content">
                    <SeatGuide />
                    <div className="full-width-horizontal-line"></div>

                </div>
            </div>
        </div>
    )
}