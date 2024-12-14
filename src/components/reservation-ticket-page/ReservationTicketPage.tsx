import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProjectionInstance } from "../../types/ProjectionInstance";
import SeatReservationPage from "./seat-reservation-page/SeatReservationPage";
import "./ReservationTicketPage.css"

export default function ReservationTicketPage() {
    const location = useLocation();
    const { projectionInstance, movie } = location.state;
    console.log(projectionInstance);
    const [projection] = useState<ProjectionInstance>(projectionInstance);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]); 
    const [remainingTime, setRemainingTime] = useState(300);
    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer); // Stop the timer when it reaches 0
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, []);

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        // padStart ensures that we always have 2 digits and it adds "0" if number is one digit number (5 -> 05)
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="seat-reservation-container">
            <div className="seat-reservation-heading-container">
                <h5 className="font-heading-h5 seat-options-heading">Seat Options</h5>
                <div className="session-duration-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={24} fill="#1D2939" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                    <div className="font-lg-regular session-duration-text">Session Duration</div>
                    <div className="session-duration-counter font-heading-h6">{formatTime(remainingTime)}</div>
                </div>
                <div className="session-duration-info font-sm-regular">
                    Session expires every 5 minutes <br />and selected seats will be refreshed
                </div>
            </div>
            <div className="seat-reservation-horizontal-line"></div>
            <SeatReservationPage
                projectionInstance={projection}
                movie={movie}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
            />
        </div>

    )
}