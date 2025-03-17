import PrimaryButton from "../../buttons/primary-button/PrimaryButton";
import SecondaryButton from "../../buttons/secondary-button/SecondaryButton";

type TwoBtnPopUpProps = {
    heading: string,
    text: string,
    secondaryBtnAction: () => void,
    secondaryBtnText: string,
    primaryBtnAction: () => void,
    primaryBtnText: string
}

export default function TwoBtnPopUp({ heading, text, secondaryBtnAction, secondaryBtnText, primaryBtnAction, primaryBtnText }: TwoBtnPopUpProps) {
    return (
        <div className="session-expired-overlay">
            <div className="session-expired-modal">
                <h6 className="font-heading-h6" style={{ color: "#101828" }}>{heading}</h6>
                <p className="font-md-regular" style={{ color: "#667085" }}> {text}</p>
                <div className="session-expired-footer" style={{ gap: "8px" }}>
                    <SecondaryButton label={secondaryBtnText} size="small" onClick={() => secondaryBtnAction()} />
                    <PrimaryButton label={primaryBtnText} size="small" onClick={() => primaryBtnAction()} />
                </div>
            </div>
        </div>
    );
}