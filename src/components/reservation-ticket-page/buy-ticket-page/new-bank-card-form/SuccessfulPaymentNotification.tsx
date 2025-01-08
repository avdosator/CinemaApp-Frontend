type SuccessfulPaymentNotificationProps = {
    redirectToHomePage: () => void
}

export default function SuccessfulPaymentNotification({ redirectToHomePage }: SuccessfulPaymentNotificationProps) {
    return (
        <>
            <div className="session-expired-overlay"></div>
            <div className="session-expired-modal">
                <h6 className="font-heading-h6" style={{ color: "#101828" }}>Payment Successful!</h6>
                <p className="font-md-regular" style={{ color: "#667085" }}>
                    The receipt and ticket have been sent to your email. You may download them immediately, or retrieve them later from your User Profile.
                </p>
                <div className="session-expired-footer" style={{ gap: "8px" }}>
                    <button className="font-sm-semibold payment-back-to-home-btn" onClick={redirectToHomePage} >Back to Home</button>
                    <button className="font-sm-semibold session-expired-btn new-bank-card-btn-disabled" disabled >Download</button>
                </div>
            </div>
        </>
    )
}