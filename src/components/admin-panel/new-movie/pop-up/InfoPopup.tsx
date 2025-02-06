type InfoPopupProps = {
    heading: string,
    text: string,
    okayAction: (close: boolean) => void
}

export default function InfoPopup({ heading, text, okayAction }: InfoPopupProps) {
    return (
        <div className="session-expired-overlay">
            <div className="session-expired-modal">
                <h6 className="font-heading-h6" style={{ color: "#101828" }}>{heading}</h6>
                <p className="font-md-regular" style={{ color: "#667085" }}> {text}</p>
                <div className="session-expired-footer" style={{ gap: "8px" }}>
                    <button className="font-sm-semibold new-bank-card-btn" style={{ width: "auto" }} onClick={() => okayAction(false)}>
                        Okay
                    </button>
                </div>
            </div>
        </div>
    );
}