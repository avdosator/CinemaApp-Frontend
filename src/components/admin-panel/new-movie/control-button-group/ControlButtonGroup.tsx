import "./ControlButtonGroup.css"

type ControlButtonGroupProps = {
    onNext: () => void,
    onBack: () => void,
    isBackDisabled: boolean,
    isFinalStep: boolean,
    isFinalStepComplete: boolean,
    onSubmit?: () => void
};

export default function ControlButtonGroup({ onNext, onBack, isBackDisabled, isFinalStep, isFinalStepComplete, onSubmit }: ControlButtonGroupProps) {
    return (
        <div className="add-movie-control-btns">
            <button className="font-lg-underline-semibold" onClick={onBack} disabled={isBackDisabled}>Back</button>
            <div>
                <button className="font-lg-semibold" disabled>Save to Drafts</button>
                {isFinalStep && isFinalStepComplete
                    ? (<button className="font-lg-semibold" onClick={onSubmit} > Add Movie</button>)
                    : (<button className="font-lg-semibold" onClick={onNext} id="continueBtn" disabled={!isFinalStepComplete}>Continue</button>)}
            </div>
        </div>
    )
}