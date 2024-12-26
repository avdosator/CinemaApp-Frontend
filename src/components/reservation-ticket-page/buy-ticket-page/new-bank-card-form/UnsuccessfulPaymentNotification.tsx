type UnsuccessfulPaymentNotificationProps = {
    errorMessage: string,
    tryAgain: () => void
}

export default function UnsuccessfulPaymentNotification({ errorMessage, tryAgain }: UnsuccessfulPaymentNotificationProps) {
    return (
        <>
            <div className="session-expired-overlay"></div>
            <div className="session-expired-modal">
                <h6 className="font-heading-h6" style={{ color: "#101828" }}>Payment Unsuccessful!</h6>
                <p className="font-md-regular" style={{ color: "#667085" }}>{errorMessage}</p>
                <div className="session-expired-footer" style={{ gap: "8px" }}>
                    <button className="font-sm-semibold session-expired-btn" onClick={tryAgain} >Try Again</button>
                </div>
            </div>
        </>
    )
}