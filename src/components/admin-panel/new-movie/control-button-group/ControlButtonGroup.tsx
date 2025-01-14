import "./ControlButtonGroup.css"

type ControlButtonGroupProps = {
    onNext: () => void;
    onBack: () => void;
    isBackDisabled: boolean;
};

export default function ControlButtonGroup({ onNext, onBack, isBackDisabled }: ControlButtonGroupProps) {
    return (
        <div className="add-movie-control-btns">
            <button className="font-lg-underline-semibold" onClick={onBack} disabled={isBackDisabled}>Back</button>
            <div>
                <button className="font-lg-semibold" disabled>Save to Drafts</button>
                <button className="font-lg-semibold" onClick={onNext}>Continue</button>
            </div>
        </div>
    )
}