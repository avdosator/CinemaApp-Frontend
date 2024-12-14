import "./ChosenSeats.css"

export default function ChosenSeats() {
    return (
        <div className="chosen-seats-container">
            <p className="font-lg-regular" style={{ color: "#1D2939" }}>Chosen Seats</p>
            <div className="seats-and-price-heading">
                <p className="font-lg-regular" style={{ color: "#1D2939" }}>Seat(s)</p>
                <p className="font-lg-regular" style={{ color: "#1D2939" }}>Total price</p>
            </div>
            <div className="full-width-horizontal-line"></div>
            <div className="chosen-seats-price">
                <h6 className="font-heading-h6">
                    H3,H4
                </h6>
                <h6 className="font-heading-h6">
                    20BAM
                </h6>
            </div>
        </div>
    )
}