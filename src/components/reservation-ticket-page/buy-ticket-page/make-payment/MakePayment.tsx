import NewBankCardForm from "../new-bank-card-form/NewBankCardForm"
import BankCard from "../bank-card/BankCard"
import "./MakePayment.css"
import { Seat } from "../../../../types/Seat"
import { calculateReservedSeatsPrice } from "../../../../utils/utils";

type MakePaymentProps = {
    selectedSeats: Seat[]
}

export default function MakePayment({selectedSeats}: MakePaymentProps) {
    const totalPrice: number = calculateReservedSeatsPrice(selectedSeats);

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
            <NewBankCardForm totalPrice={totalPrice} />
        </div>
    )
}