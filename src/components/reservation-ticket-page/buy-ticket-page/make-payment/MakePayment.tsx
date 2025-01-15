import NewBankCardForm from "../new-bank-card-form/NewBankCardForm"
import BankCard from "../bank-card/BankCard"
import "./MakePayment.css"
import { Seat } from "../../../../types/Seat"
import { ProjectionInstance } from "../../../../types/ProjectionInstance";
import { Movie } from "../../../../types/Movie";

type MakePaymentProps = {
    projection: ProjectionInstance,
    movie: Movie,
    selectedSeats: Seat[],
    totalPrice: number
}

export default function MakePayment({ projection, movie, selectedSeats, totalPrice }: MakePaymentProps) {

    return (
        <div className="make-payment-container">
            <h6 className="font-heading-h6" style={{ color: "#667085", marginBottom: "0px" }}>Saved Cards</h6>
            <BankCard cardType="visa" />
            <BankCard cardType="mastercard" />
            <div className="font-heading-h6" id="big-or-divider" style={{ color: "#667085" }}>
                <span className="auth-horizontal-line" style={{ color: "#E4E7EC" }}></span>
                <span>or</span>
                <span className="auth-horizontal-line" style={{ color: "#E4E7EC" }}></span>
            </div>
            <h6 className="font-heading-h6" style={{ color: "#667085", marginBottom: "0px" }}>Add New Card</h6>
            <NewBankCardForm projection={projection} movie={movie} selectedSeats={selectedSeats} totalPrice={totalPrice} />
        </div>
    )
}