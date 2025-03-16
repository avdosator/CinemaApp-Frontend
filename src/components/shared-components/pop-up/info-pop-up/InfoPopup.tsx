import PrimaryButton from "../../buttons/primary-button/PrimaryButton";
import "../Popup.css"

type InfoPopupProps = {
    heading: string,
    text: string,
    okayAction: (close: boolean) => void
}

export default function InfoPopup({ heading, text, okayAction }: InfoPopupProps) {
    return (
        <div className="pop-up-overlay">
            <div className="pop-up-modal">
                <h6 className="font-heading-h6" style={{ color: "#101828" }}>{heading}</h6>
                <p className="font-md-regular" style={{ color: "#667085" }}> {text}</p>
                <div className="pop-up-footer">
                    <PrimaryButton label="Okay" size="small" onClick={() => okayAction(false)} />
                </div>
            </div>
        </div>
    );
}