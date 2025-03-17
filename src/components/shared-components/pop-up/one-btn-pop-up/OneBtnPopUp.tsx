import PrimaryButton from "../../buttons/primary-button/PrimaryButton";
import "../Popup.css"

type OneBtnPopUpProps = {
    heading: string,
    text: string,
    btnText: string,
    onBtnClick: (close: boolean) => void
}

export default function OneBtnPopUp({ heading, text, onBtnClick, btnText }: OneBtnPopUpProps) {
    return (
        <div className="pop-up-overlay">
            <div className="pop-up-modal">
                <h6 className="font-heading-h6" style={{ color: "#101828" }}>{heading}</h6>
                <p className="font-md-regular" style={{ color: "#667085" }}> {text}</p>
                <div className="pop-up-footer">
                    <PrimaryButton label={btnText} size="small" onClick={() => onBtnClick(false)} />
                </div>
            </div>
        </div>
    );
}