import { AddMovieFormStep } from "../../../../types/FormData";

type AddMovieStepIndicatorProps = {
    isGeneralFormComplete: boolean,
    isDetailsFormComplete: boolean,
    isProjectionsFormComplete: boolean,
    stepStatus: (step: AddMovieFormStep) => string
}

export default function AddMovieStepIndicator({
    isGeneralFormComplete,
    isDetailsFormComplete,
    isProjectionsFormComplete,
    stepStatus
}: AddMovieStepIndicatorProps) {
    return (
        <>
            <div className="add-movie-step-container font-heading-h6">
                {/* Step 1 */}
                <div className={`step-circle ${stepStatus(1)} ${isGeneralFormComplete ? "filled" : ""}`} >1</div>
                <div className={`add-movie-step-line ${stepStatus(1)}`}></div>

                {/* Step 2 */}
                <div className={`step-circle ${stepStatus(2)} ${isDetailsFormComplete ? "filled" : ""}`} >2</div>
                <div className={`add-movie-step-line ${stepStatus(2)}`}></div>

                {/* Step 3 */}
                <div className={`step-circle ${stepStatus(3)} ${isProjectionsFormComplete ? "filled" : ""}`} >3</div>
            </div>
            <div className="add-movie-step-labels font-lg-semibold">
                <p className="step-label" style={isGeneralFormComplete ? { color: "#1D2939" } : {}}>General</p>
                <p className="step-label" style={isDetailsFormComplete ? { color: "#1D2939" } : {}}>Details</p>
                <p className="step-label" style={isProjectionsFormComplete ? { color: "#1D2939" } : {}}>Venues</p>
            </div>
        </>
    );
}