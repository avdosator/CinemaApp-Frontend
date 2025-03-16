type SuccessfulPaymentNotificationProps = {
    redirectToHomePage: () => void
}

export default function SuccessfulPaymentNotification({ redirectToHomePage }: SuccessfulPaymentNotificationProps) {
    return (
        <>
            <div className="pop-up-overlay"></div>
            <div className="pop-up-modal">
                <h6 className="font-heading-h6" style={{ color: "#101828" }}>Payment Successful!</h6>
                <p className="font-md-regular" style={{ color: "#667085" }}>
                    The receipt and ticket have been sent to your email. You may download them immediately, or retrieve them later from your User Profile.
                </p>
                <div className="pop-up-footer">
                    <button className="font-sm-semibold payment-back-to-home-btn" onClick={redirectToHomePage} >Back to Home</button>
                    {/* <button className="font-sm-semibold session-expired-btn new-bank-card-btn-disabled" disabled >Download</button> */}
                </div>
            </div>
        </>
    )
}