import { useLocation } from "react-router-dom";

export default function SeatReservationPage() {
    const location = useLocation();
    const { projectionInstance, movie } = location.state || {};

    if (!projectionInstance || !movie) {
        return <div>Missing data for seat reservation.</div>;
    }
    return (
        <div>
            <h1>SEAT REESRVATION PAGE</h1>
            <p>Movie: {movie.title}</p>
        </div>
    )
}