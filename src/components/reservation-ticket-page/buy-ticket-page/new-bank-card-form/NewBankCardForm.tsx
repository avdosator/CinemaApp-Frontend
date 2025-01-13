import { useForm } from "react-hook-form"
import { Movie } from "../../../../types/Movie"
import { ProjectionInstance } from "../../../../types/ProjectionInstance"
import { Seat } from "../../../../types/Seat"
import "./NewBankCardForm.css"
import { useUser } from "../../../../context/UserContext"
import ApiService from "../../../../service/ApiService"
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UnsuccessfulPaymentNotification from "./UnsuccessfulPaymentNotification"
import SuccessfulPaymentNotification from "./SuccessfulPaymentNotification"

type NewBankCardFormType = {
    cardNumber: string,
    expiryDate: string,
    cvv: string,
}

type NewBankCardFormProps = {
    projection: ProjectionInstance,
    movie: Movie,
    selectedSeats: Seat[],
    totalPrice: number
}

const inputStyle = {
    base: {
        fontSize: "16px",
        color: "#344054",
        fontFamily: "Urbanist, sans-serif",
        "::placeholder": { color: "#667085" },
    },
    invalid: {
        color: "#FDA29B",
        iconColor: "#FDA29B",
    },
}

export default function NewBankCardForm({ projection, movie, selectedSeats, totalPrice }: NewBankCardFormProps) {
    const [cardDetails, setCardDetails] = useState({
        cardNumberError: null,
        expiryDateError: null,
        cvvError: null,
        isCardNumberValid: false,
        isExpiryDateValid: false,
        isCvvValid: false,
    });
    const [successfulPayment, setSuccessfulPayment] = useState<boolean>(false);
    const [unsuccessfulPayment, setUnsuccessfulPayment] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { handleSubmit, formState: { isSubmitting } } = useForm<NewBankCardFormType>({ mode: "onChange", });
    const { currentUser } = useUser();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const isFormValid = stripe && elements && cardDetails.isCardNumberValid && cardDetails.isExpiryDateValid && cardDetails.isCvvValid;

    const handleCardChange = (field: "cardNumber" | "expiryDate" | "cvv", event: any) => {
        setCardDetails((prev) => ({
            ...prev,
            [`${field}Error`]: event.error ? event.error.message : null,
            [`is${field[0].toUpperCase() + field.slice(1)}Valid`]: !event.error && event.complete,
        }));
    };

    const renderError = (error: string | null) => error && <div className="font-sm-regular auth-error">{error}</div>;

    const onSubmit = async () => {
        if (!stripe || !elements) {
            console.error("Stripe has not loaded yet.");
            return;
        }

        const intentBody = {
            userId: currentUser?.id,
            projectionInstanceId: projection.id,
            selectedSeats: selectedSeats,
        };

        try {
            const { clientSecret } = await ApiService.post<{ clientSecret: string }>("/payments/intent", intentBody);

            // Step 2: Confirm the payment with the client secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement)!,
                },
            });

            if (result.error) {
                console.error("Payment failed:", result.error.message);
                return;
            } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
                const jwt = localStorage.getItem("authToken");
                const headers = { "Authorization": `Bearer ${jwt}` };

                const createPaymentBody = {
                    userId: currentUser?.id,
                    projectionInstanceId: projection.id,
                    selectedSeats: selectedSeats,
                    paymentIntentId: result.paymentIntent.id,
                    movieId: movie.id
                }
                const createPaymentResponse = await ApiService.post<{ status: string, message: string }>("/payments", createPaymentBody, headers);
                if (createPaymentResponse.status === "success") {
                    setSuccessfulPayment(true);
                }
            }
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
            setUnsuccessfulPayment(true);
        }
    }

    const redirectToHomePage = () => {
        setSuccessfulPayment(false);
        navigate("/home");
    }

    return (
        <div id="new-card-form-container">
            {successfulPayment && (<SuccessfulPaymentNotification redirectToHomePage={redirectToHomePage} />)}
            {unsuccessfulPayment && (<UnsuccessfulPaymentNotification errorMessage={errorMessage} tryAgain={() => setUnsuccessfulPayment(false)} />)}
            <form className="font-lg-regular new-bank-card-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="add-new-card-form-input-group">
                    <label htmlFor="cardNumber" className="new-bank-card-form-label font-lg-semibold">Card Number</label>
                    <div className="input-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" id="creditCard" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16l0 32L48 128l0-32c0-8.8 7.2-16 16-16l448 0zm16 144l0 192c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-192 480 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z" /></svg>
                        <CardNumberElement
                            options={{ style: inputStyle }}
                            className="add-new-card-input"
                            onChange={(event) => handleCardChange("cardNumber", event)}
                            id="cardNumber"
                        />
                    </div>
                    {renderError(cardDetails.cardNumberError)}
                </div>
                <div className="expiry-and-cvv-container">
                    <div className="add-new-card-form-input-group">
                        <label htmlFor="expiryDate" className="new-bank-card-form-label font-lg-semibold">Expiry Date</label>
                        <CardExpiryElement
                            options={{ style: inputStyle }}
                            className="add-new-card-input"
                            onChange={(event) => handleCardChange("expiryDate", event)}
                        />
                        {renderError(cardDetails.expiryDateError)}
                    </div>
                    <div className="add-new-card-form-input-group">
                        <label htmlFor="cvv" className="new-bank-card-form-label font-lg-semibold">CVV</label>
                        <CardCvcElement
                            options={{ style: inputStyle }}
                            className="add-new-card-input"
                            onChange={(event) => handleCardChange("cvv", event)}
                        />
                        {renderError(cardDetails.cvvError)}
                    </div>
                </div>
                <button
                    type="submit"
                    className={`font-lg-semibold new-bank-card-btn ${!isFormValid || isSubmitting ? "new-bank-card-btn-disabled" : ""}`}
                    disabled={!isFormValid || isSubmitting}
                >
                    Make Payment - {totalPrice} BAM
                </button>
            </form>
        </div>
    )
}