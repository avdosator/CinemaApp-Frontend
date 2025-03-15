import PrimaryButton from "../../../shared-components/buttons/primary-button/PrimaryButton";
import SecondaryButton from "../../../shared-components/buttons/secondary-button/SecondaryButton";
import TertiaryButton from "../../../shared-components/buttons/tertiary-button/TertiaryButton";
import "./ControlButtonGroup.css"

type ControlButtonGroupProps = {
    onNext: () => void,
    onBack: () => void,
    isBackDisabled: boolean,
    isFinalStep: boolean,
    isFormComplete: boolean,
    handleAddMovie?: () => void,
    handleSaveDraft: () => void
};

export default function ControlButtonGroup({ onNext, onBack, isBackDisabled, isFinalStep, isFormComplete, handleAddMovie, handleSaveDraft }: ControlButtonGroupProps) {

    return (
        <div className="add-movie-control-btns">
            <TertiaryButton label="Back" size="large" onClick={onBack} isDisabled={isBackDisabled} />
            <div>
                <SecondaryButton label="Save to Drafts" onClick={handleSaveDraft} style={{ marginRight: "16px" }} size="large" />
                {isFinalStep && isFormComplete
                    ? (<PrimaryButton label="Add Movie" onClick={handleAddMovie} size="large" />)
                    : (<PrimaryButton label="Continue" onClick={onNext} isDisabled={!isFormComplete && isFinalStep} size="large" />)}
            </div>
        </div>
    )
}