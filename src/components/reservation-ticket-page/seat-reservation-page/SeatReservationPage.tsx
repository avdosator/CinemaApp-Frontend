import { Venue } from "../../../types/Venue";
import VerticalLine from "../../shared-components/divider/VerticalLine";
import ChosenSeats from "./chosen-seats/ChosenSeats";
import SeatGuide from "./seat-guide/SeatGuide";
import SeatSchema from "./seat-schema/SeatSchema";
import "./SeatReservationPage.css"
import { ProjectionInstance } from "../../../types/ProjectionInstance";
import { Movie } from "../../../types/Movie";
import { Seat } from "../../../types/Seat";

type SeatReservationPageProps = {
    projectionInstance: ProjectionInstance,
    movie: Movie,
    selectedSeats: Seat[],
    setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>
}

export default function SeatReservationPage({ projectionInstance, movie, selectedSeats, setSelectedSeats }: SeatReservationPageProps) {
    const venue: Venue = projectionInstance.projection.hall.venue;

    const date = new Date(projectionInstance.date);
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return (
        <div>
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
                <SeatSchema projectionInstance={projectionInstance} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
                <div className="seat-reservation-right-content">
                    <SeatGuide />
                    <div className="full-width-horizontal-line"></div>
                    <ChosenSeats selectedSeats={selectedSeats} />
                </div>
            </div>
        </div>
    )
}