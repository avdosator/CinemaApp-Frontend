type DraftMoviePopUpProps = {
    message: string,
    onConfirm?: () => void,
    onCancel: () => void,
    cancelButtonText?: string
};

export default function DraftMoviePopUp({ message, onConfirm, onCancel, cancelButtonText = "Cancel" }: DraftMoviePopUpProps) {
    return (
        <div className="session-expired-overlay">
            <div className="session-expired-modal">
                <h6 className="font-heading-h6" style={{ color: "#101828" }}>Warning!</h6>
                <p className="font-md-regular" style={{ color: "#667085" }}> {message}</p>
                <div className="session-expired-footer" style={{ gap: "8px" }}>
                    {onConfirm && (
                        <button className="font-sm-semibold new-bank-card-btn" style={{ width: "auto" }} onClick={onConfirm}>
                            Continue
                        </button>
                    )}
                    <button className="font-sm-semibold new-bank-card-btn" style={{ width: "auto" }} onClick={onCancel}>
                        {cancelButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}
