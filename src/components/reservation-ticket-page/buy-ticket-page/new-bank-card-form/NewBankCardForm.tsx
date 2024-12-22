import { SubmitHandler, useForm } from "react-hook-form"
import { Movie } from "../../../../types/Movie"
import { ProjectionInstance } from "../../../../types/ProjectionInstance"
import { Seat } from "../../../../types/Seat"
import { calculateReservedSeatsPrice } from "../../../../utils/utils"
import "./NewBankCardForm.css"

type NewBankCardFormType = {
    cardNumber: string,
    expiryDate: string,
    cvv: string,
}

type NewBankCardFormProps = {
    projection: ProjectionInstance,
    movie: Movie,
    selectedSeats: Seat[],
}

export default function NewBankCardForm({ projection, movie, selectedSeats }: NewBankCardFormProps) {
    const totalPrice: number = calculateReservedSeatsPrice(selectedSeats);
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<NewBankCardFormType>({
        mode: "onChange", // Enables validation check on change
    });

    const onSubmit: SubmitHandler<NewBankCardFormType> = async (formData) => {
        console.log(formData);
        console.log(projection);
        console.log(movie);
    }

    return (
        <div>
            <form className="font-lg-regular new-bank-card-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="add-new-card-form-input-group">
                    <label htmlFor="cardNumber" className="new-bank-card-form-label font-lg-semibold">Card Number</label>
                    <div className="input-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" id="creditCard" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16l0 32L48 128l0-32c0-8.8 7.2-16 16-16l448 0zm16 144l0 192c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-192 480 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z" /></svg>
                        <input
                            {...register("cardNumber", {
                                required: "Please enter valid card number.",
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "Card number must contain only digits.",
                                },
                                minLength: {
                                    value: 16,
                                    message: "Card number must have 16 digits"
                                },
                                maxLength: {
                                    value: 16,
                                    message: "Card number must have 16 digits"
                                }
                            })}
                            type="text"
                            id="cardNumber"
                            className="add-new-card-input"
                            placeholder="**** **** **** ****" />
                    </div>
                    {errors.cardNumber && <div className="font-sm-regular auth-error">{errors.cardNumber.message}</div>}
                </div>
                <div className="expiry-and-cvv-container">
                    <div className="add-new-card-form-input-group">
                        <label htmlFor="expiryDate" className="new-bank-card-form-label font-lg-semibold">Expiry Date</label>
                        <input
                            {...register("expiryDate", {
                                required: "Please enter expiration date",
                                pattern: {
                                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                    message: "Invalid expiration date. Use MM/YY format."
                                }
                            })}
                            type="text"
                            id="expiryDate"
                            className="add-new-card-input"
                            placeholder="00/00"
                        />
                        {errors.expiryDate && <div className="font-sm-regular auth-error">{errors.expiryDate.message}</div>}
                    </div>
                    <div className="add-new-card-form-input-group">
                        <label htmlFor="cvv" className="new-bank-card-form-label font-lg-semibold">CVV</label>
                        <input
                            {...register("cvv", {
                                required: "Please enter CVV number.",
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "CVV must contain only digits.",
                                },
                                minLength: {
                                    value: 3,
                                    message: "CVV must be three digit number."
                                },
                                maxLength: {
                                    value: 3,
                                    message: "CVV must be three digit number."
                                }
                            })}
                            type="text"
                            id="cvv"
                            className="add-new-card-input"
                            placeholder="000" />
                        {errors.cvv && <div className="font-sm-regular auth-error">{errors.cvv.message}</div>}
                    </div>
                </div>
                <button
                    type="submit"
                    className={`font-lg-semibold new-bank-card-btn ${!isValid || isSubmitting ? "new-bank-card-btn-disabled" : ""}`}
                    disabled={!isValid || isSubmitting}
                >
                    Make Payment - {totalPrice} BAM
                </button>
            </form>
        </div>
    )
}