import "./SeatGuide.css"
import Seat from "../seat/Seat";

export default function SeatGuide() {
    return (
        <div className="seat-guide">
            <p className="font-lg-regular" style={{ color: "#1D2939", marginBottom: "0px" }}>Seat Guide</p>
            <div className="seat-guide-content">
                <div className="seat-availability">
                    <div className="seat-guide-group">
                        <Seat number="XY" type="regular" />
                        <span>Available</span>
                    </div>
                    <div className="seat-guide-group">
                        <Seat number="XY" type="regular" classes="reserved-seat" />
                        <span>Reserved</span>
                    </div>
                    <div className="seat-guide-group">
                        <Seat number="XY" type="regular" classes="selected-seat" />
                        <span>Selected</span>
                    </div>
                </div>
                <div className="seat-prices">
                    <div className="seat-guide-group">
                        <Seat number="XY" type="regular" classes="regular-seat" />
                        <span>Regular Seats(7 BAM)</span>
                    </div>
                    <div className="seat-guide-group">
                        <Seat number="XY" type="VIP" classes="vip-seat" />
                        <span>VIP Seats (10 BAM)</span>
                    </div>
                    <div className="seat-guide-group">
                        <Seat number="XY" type="love" classes="love-seat" />
                        <span>Love Seats(24 BAM)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}