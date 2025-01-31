import "./ControlButtonGroup.css"

type ControlButtonGroupProps = {
    onNext: () => void,
    onBack: () => void,
    isBackDisabled: boolean,
    isFinalStep: boolean,
    isFormComplete: boolean,
    handleAddMovie?: () => void
};

export default function ControlButtonGroup({ onNext, onBack, isBackDisabled, isFinalStep, isFormComplete, handleAddMovie }: ControlButtonGroupProps) {

    return (
        <div className="add-movie-control-btns">
            <button className="font-lg-underline-semibold" onClick={onBack} disabled={isBackDisabled}>Back</button>
            <div>
                <button className="font-lg-semibold" disabled>Save to Drafts</button>
                {isFinalStep && isFormComplete
                    ? (<button className="font-lg-semibold" onClick={handleAddMovie} > Add Movie</button>)
                    : (<button className="font-lg-semibold" onClick={onNext} id="continueBtn" disabled={!isFormComplete && isFinalStep}>Continue</button>)}
            </div>
        </div>
    )
}