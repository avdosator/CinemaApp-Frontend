import PrimaryButton from "../../../shared-components/buttons/primary-button/PrimaryButton";
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
                <button className="font-lg-semibold" onClick={handleSaveDraft}>Save to Drafts</button>
                {isFinalStep && isFormComplete
                    ? (<PrimaryButton label="Add Movie" onClick={handleAddMovie} />)
                    : (<PrimaryButton label="Continue" onClick={onNext} isDisabled={!isFormComplete && isFinalStep} />)}
            </div>
        </div>
    )
}