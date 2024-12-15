import "./SeatGuide.css"
import LoveSeat from "../seat/LoveSeat";
import RegularSeat from "../seat/RegularSeat";
import VipSeat from "../seat/VipSeat";

export default function SeatGuide() {
    return (
        <div className="seat-guide">
            <p className="font-lg-regular" style={{ color: "#1D2939", marginBottom: "0px" }}>Seat Guide</p>
            <div className="seat-guide-content">
                <div className="seat-availability">
                    <div className="seat-guide-group">
                        <RegularSeat number="XY" />
                        <span>Available</span>
                    </div>
                    <div className="seat-guide-group">
                        <RegularSeat number="XY" classes="reserved-seat" />
                        <span>Reserved</span>
                    </div>
                    <div className="seat-guide-group">
                        <RegularSeat number="XY" classes="selected-seat" />
                        <span>Selected</span>
                    </div>
                </div>
                <div className="seat-prices">
                    <div className="seat-guide-group">
                        <RegularSeat number="XY" />
                        <span>Regular Seats(7 BAM)</span>
                    </div>
                    <div className="seat-guide-group">
                        <VipSeat number="XY" />
                        <span>VIP Seats (10 BAM)</span>
                    </div>
                    <div className="seat-guide-group">
                        <LoveSeat number="XY" />
                        <span>Love Seats(24 BAM)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}