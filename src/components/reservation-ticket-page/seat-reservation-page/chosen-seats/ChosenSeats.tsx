import { Seat } from "../../../../types/Seat"
import "./ChosenSeats.css"

type ChosenSeatsProps = {
    selectedSeats: Seat[]
}

export default function ChosenSeats({ selectedSeats }: ChosenSeatsProps) {

    // Calculate total price of selected seats
    let totalPrice: number = 0;
    if (selectedSeats.length > 0) {
        totalPrice = selectedSeats.reduce((sum, seat) => {
            switch (seat.type) {
                case "regular":
                    return sum + 7;
                case "VIP":
                    return sum + 10;
                case "love":
                    return sum + 24;
                default:
                    return sum;
            }
        }, 0);
    }

    return (
        <div className="chosen-seats-container">
            <p className="font-lg-regular" style={{ color: "#1D2939" }}>Chosen Seats</p>
            <div className="seats-and-price-heading">
                <p className="font-lg-regular" style={{ color: "#1D2939" }}>Seat(s)</p>
                <p className="font-lg-regular" style={{ color: "#1D2939" }}>Total price</p>
            </div>
            <div className="full-width-horizontal-line"></div>
            {selectedSeats.length > 0 && (
                <div className="chosen-seats-price">
                    <h6 className="font-heading-h6">
                        {selectedSeats.map((seat, index) => {
                            return index !== selectedSeats.length - 1 ? `${seat.number}, ` : `${seat.number}`
                        })}
                    </h6>
                    <h6 className="font-heading-h6">
                        {totalPrice}BAM
                    </h6>
                </div>
            )}
        </div>
    )
}