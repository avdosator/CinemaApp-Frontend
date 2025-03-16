type UnsuccessfulPaymentNotificationProps = {
    errorMessage: string,
    tryAgain: () => void
}

export default function UnsuccessfulPaymentNotification({ errorMessage, tryAgain }: UnsuccessfulPaymentNotificationProps) {
    return (
        <>
            <div className="pop-up-overlay"></div>
            <div className="pop-up-modal">
                <h6 className="font-heading-h6" style={{ color: "#101828" }}>Payment Unsuccessful!</h6>
                <p className="font-md-regular" style={{ color: "#667085" }}>{errorMessage}</p>
                <div className="pop-up-footer">
                    <button className="font-sm-semibold session-expired-btn" onClick={tryAgain} >Try Again</button>
                </div>
            </div>
        </>
    )
}