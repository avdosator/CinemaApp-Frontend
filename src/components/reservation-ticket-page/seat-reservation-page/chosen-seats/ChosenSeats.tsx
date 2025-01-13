import { Seat } from "../../../../types/Seat"
import "./ChosenSeats.css"

type ChosenSeatsProps = {
    selectedSeats: Seat[],
    proceedToBuyTicket: React.Dispatch<React.SetStateAction<"Seat Options" | "Payment Details">>,
    totalPrice: number
}

export default function ChosenSeats({ selectedSeats, proceedToBuyTicket, totalPrice }: ChosenSeatsProps) {

    let areSelectedSeatsEmpty: boolean = selectedSeats.length === 0;

    return (
        <div className="chosen-seats-container">
            <p className="font-lg-regular" style={{ color: "#1D2939" }}>Chosen Seats</p>
            <div className="seats-and-price-heading">
                <p className="font-lg-regular" style={{ color: "#1D2939" }}>Seat(s)</p>
                <p className="font-lg-regular" style={{ color: "#1D2939" }}>Total price</p>
            </div>
            <div className="full-width-horizontal-line"></div>
            {!areSelectedSeatsEmpty && (
                <div className="chosen-seats-price">
                    <h6 className="font-heading-h6">
                        {selectedSeats.map((seat, index) => {
                            return index !== selectedSeats.length - 1 ? `${seat.number}, ` : `${seat.number}`
                        })}
                    </h6>
                    <h6 className="font-heading-h6">
                        {totalPrice} BAM
                    </h6>
                </div>
            )}
            <button
                className={`font-lg-semibold continue-payment-btn ${areSelectedSeatsEmpty ? "continue-payment-btn-disabled" : ""}`}
                disabled={areSelectedSeatsEmpty}
                onClick={() => proceedToBuyTicket("Payment Details")}
            >
                Continue to Payment
            </button>
        </div>
    )
}