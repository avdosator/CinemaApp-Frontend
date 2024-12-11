import "./SeatReservationPage.css"
import { useLocation } from "react-router-dom";

export default function SeatReservationPage() {
    const location = useLocation();
    const { projectionInstance, movie } = location.state;

    return (
        <div className="seat-reservation-container">
            <div className="seat-reservation-heading-container">
                <h5 className="font-heading-h5 seat-options-heading">Seat Options</h5>
                <div className="session-duration-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={24} fill="#1D2939" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                    <div className="font-lg-regular session-duration-text">Session Duration</div>
                    <div className="session-duration-counter font-heading-h6">04:59</div>
                </div>
            </div>
            <div className="seat-reservation-horizontal-line"></div>
            
            <p>Movie: {movie.title}</p>
        </div>
    )
}