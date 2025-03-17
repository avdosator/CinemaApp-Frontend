import PrimaryButton from "../../buttons/primary-button/PrimaryButton";

type DraftMoviePopUpProps = {
    message: string,
    onConfirm?: () => void,
    onCancel: () => void,
    cancelButtonText?: string
};

export default function DraftMoviePopup({ message, onConfirm, onCancel, cancelButtonText = "Cancel" }: DraftMoviePopUpProps) {
    return (
        <div className="pop-up-overlay">
            <div className="pop-up-modal">
                <h6 className="font-heading-h6">Warning!</h6>
                <p className="font-md-regular"> {message}</p>
                <div className="pop-up-footer">
                    {onConfirm && (<PrimaryButton label="Continue" onClick={onConfirm} size="small" />)}
                    <PrimaryButton label={cancelButtonText} onClick={onCancel} size="small" />
                </div>
            </div>
        </div>
    );
}
