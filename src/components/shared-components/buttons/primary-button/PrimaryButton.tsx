import "./PrimaryButton.css"

type PrimaryButtonProps = {
    label: string,
    onClick: () => void,
    isDisabled: boolean,
    isFullWidth: boolean
}

export default function PrimaryButton({label, onClick, isDisabled, isFullWidth} : PrimaryButtonProps) {
    return (
        <button 
        className="primary-button font-lg-semibold" 
        onClick={onClick} 
        disabled={isDisabled}
        style={{ width: isFullWidth ? "100%" : "auto" }}
        >
            {label}
        </button>
    );
}