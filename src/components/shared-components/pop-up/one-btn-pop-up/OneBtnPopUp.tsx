import PrimaryButton from "../../buttons/primary-button/PrimaryButton";
import "../Popup.css"

type OneBtnPopUpProps = {
    heading: string,
    text: string,
    btnText?: string,
    onBtnClick: () => void
}

export default function OneBtnPopUp({ heading, text, onBtnClick, btnText = "Okay" }: OneBtnPopUpProps) {
    return (
        <div className="pop-up-overlay">
            <div className="pop-up-modal">
                <h6 className="font-heading-h6">{heading}</h6>
                <p className="font-md-regular"> {text}</p>
                <div className="pop-up-footer">
                    <PrimaryButton label={btnText} size="small" onClick={() => onBtnClick()} />
                </div>
            </div>
        </div>
    );
}