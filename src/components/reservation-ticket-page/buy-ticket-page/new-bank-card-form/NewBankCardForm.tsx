import { Movie } from "../../../../types/Movie"
import { ProjectionInstance } from "../../../../types/ProjectionInstance"
import { Seat } from "../../../../types/Seat"
import { calculateReservedSeatsPrice } from "../../../../utils/utils"
import "./NewBankCardForm.css"

type NewBankCardFormProps = {
    projection: ProjectionInstance,
    movie: Movie,
    selectedSeats: Seat[],
}

export default function NewBankCardForm({projection, movie, selectedSeats}: NewBankCardFormProps) {
    const totalPrice: number = calculateReservedSeatsPrice(selectedSeats);

    return (
        <div>
            <form className="font-lg-regular new-bank-card-form" onSubmit={() => console.log("form submitted")}>
                <div className="add-new-card-form-input-group">
                    <label htmlFor="cardNumber" className="new-bank-card-form-label font-lg-semibold">Card Number</label>
                    <div className="input-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" id="creditCard" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16l0 32L48 128l0-32c0-8.8 7.2-16 16-16l448 0zm16 144l0 192c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-192 480 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z"/></svg>
                    <input type="text" id="cardNumber" className="add-new-card-input" placeholder="**** **** **** ****" />
                    </div>
                </div>
                <div className="expiry-and-cvv-container">
                    <div className="add-new-card-form-input-group">
                        <label htmlFor="expiryDate" className="new-bank-card-form-label font-lg-semibold">Expiry Date</label>
                        <input type="text" id="expiryDate" className="add-new-card-input" placeholder="00/00" />
                    </div>
                    <div className="add-new-card-form-input-group">
                        <label htmlFor="cvv" className="new-bank-card-form-label font-lg-semibold">CVV</label>
                        <input type="text" id="cvv" className="add-new-card-input" placeholder="000" />
                    </div>
                </div>
                <button className="font-lg-semibold new-bank-card-btn" disabled>Make Payment - {totalPrice} BAM</button>
            </form>
        </div>
    )
}