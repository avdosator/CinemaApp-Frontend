import LoveSeat from "../seat/LoveSeat";
import RegularSeat from "../seat/RegularSeat";
import VipSeat from "../seat/VipSeat";

export default function SeatGuide() {
    return (
        <div className="seat-guide">
            <p className="font-lg-regular" style={{ color: "#1D2939", marginBottom: "0px" }}>Seat Guide</p>
            <div className="seat-availability">
                <RegularSeat number="XY" />
                <RegularSeat number="XY" />
                <RegularSeat number="XY" />
            </div>
            <div className="seat-prices">
                <RegularSeat number="XY" />
                <VipSeat number="XY" />
                <LoveSeat number="XY" />
            </div>
        </div>
    )
}