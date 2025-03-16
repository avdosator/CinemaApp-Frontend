import PrimaryButton from "../../buttons/primary-button/PrimaryButton";
import SecondaryButton from "../../buttons/secondary-button/SecondaryButton";

type DeleteProjectionPopupProps = {
    heading: string,
    text: string,
    cancelAction: () => void,
    deleteAction: () => void
}

export default function DeleteProjectionPopup({ heading, text, cancelAction, deleteAction }: DeleteProjectionPopupProps) {
    return (
        <div className="session-expired-overlay">
            <div className="session-expired-modal">
                <h6 className="font-heading-h6" style={{ color: "#101828" }}>{heading}</h6>
                <p className="font-md-regular" style={{ color: "#667085" }}> {text}</p>
                <div className="session-expired-footer" style={{ gap: "8px" }}>
                    <SecondaryButton label="Cancel" size="small" onClick={() => cancelAction()} />
                    <PrimaryButton label="Delete" size="small" onClick={() => deleteAction()} />
                </div>
            </div>
        </div>
    );
}