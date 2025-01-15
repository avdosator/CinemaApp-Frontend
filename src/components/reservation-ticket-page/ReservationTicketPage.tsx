import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProjectionInstance } from "../../types/ProjectionInstance";
import SeatReservationPage from "./seat-reservation-page/SeatReservationPage";
import "./ReservationTicketPage.css"
import ApiService from "../../service/ApiService";
import { Seat } from "../../types/Seat";
import BuyTicketPage from "./buy-ticket-page/BuyTicketPage";
import { TicketPrice } from "../../types/TicketPrice";
import { calculateReservedSeatsPrice } from "../../utils/utils";

const SESSION_DURATION = 300;

export default function ReservationTicketPage() {
    const location = useLocation();
    const { projectionInstance, movie } = location.state;
    const [projection, setProjection] = useState<ProjectionInstance>(projectionInstance);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const [remainingTime, setRemainingTime] = useState(SESSION_DURATION);
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [step, setStep] = useState<"Seat Options" | "Payment Details">("Seat Options");
    const [ticketPrices, setTicketPrices] = useState<TicketPrice[]>([]);

    const totalPrice: number = calculateReservedSeatsPrice(selectedSeats, ticketPrices);

    useEffect(() => window.scrollTo(0, 0), []);

    useEffect(() => {
        const fetchTicketPrices = async () => {
            try {
                const prices = await ApiService.get<TicketPrice[]>("/ticket-prices");
                setTicketPrices(prices);
            } catch (error) {
                console.error("Failed to fetch ticket prices:", error);
            }
        };
        fetchTicketPrices();
    }, []);

    const refreshProjectionState = async () => {
        try {
            const response = await ApiService.get<ProjectionInstance>(`/projections/instance/${projectionInstance.id}`);
            if (response !== null) setProjection(response);
            setSelectedSeats([]);
            setRemainingTime(SESSION_DURATION);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (showModal) return; // Stop the timer when the modal is visible

        const timer = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setShowModal(true);
                    setStep("Seat Options");
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, [showModal]);

    const handleOkayClick = () => {
        setShowModal(false); // Hide modal
        setRemainingTime(SESSION_DURATION); // Reset timer
    };

    useEffect(() => {
        if (remainingTime === 0) {
            refreshProjectionState();
        }
    }, [remainingTime]);

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        // padStart ensures that we always have 2 digits and it adds "0" if number is one digit number (5 -> 05)
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="seat-reservation-container">
            {showModal && (
                <>
                    <div className="session-expired-overlay"></div>
                    <div className="session-expired-modal">
                        <h6 className="font-heading-h6" style={{ color: "#101828" }}>Session Expired</h6>
                        <p className="font-md-regular" style={{ color: "#667085" }}>Your session expired and seats have been refreshed and updated.</p>
                        <div className="session-expired-footer">
                            <button className="font-sm-semibold session-expired-btn" onClick={handleOkayClick}>Okay</button>
                        </div>
                    </div>
                </>
            )}

            <div className="seat-reservation-heading-container">
                <h5 className="font-heading-h5 seat-options-heading">{step}</h5>
                <div className="session-duration-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={24} fill="#1D2939" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                    <div className="font-lg-regular session-duration-text">Session Duration</div>
                    <div className="session-duration-counter font-heading-h6">{formatTime(remainingTime)}</div>
                </div>
                <div className="session-duration-info font-sm-regular">
                    Session expires every 5 minutes <br />when selected seats will be refreshed
                </div>
            </div>
            <div className={`seat-reservation-horizontal-line ${step === "Seat Options" ? "seat-options-line" : "payment-details-line"}`}></div>
            {step === "Seat Options" ? (<SeatReservationPage
                projectionInstance={projection}
                movie={movie}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                proceedToBuyTicket={setStep}
                totalPrice={totalPrice}
            />)
                :
                (<BuyTicketPage projection={projection} movie={movie} selectedSeats={selectedSeats} totalPrice={totalPrice} />)
            }

        </div>

    )
}