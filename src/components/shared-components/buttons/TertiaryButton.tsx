import "./TertiaryButton.css"

type TertiaryButtonProps = {
    label: string,
    size: string,
    onClick?: () => void
}

export default function TertiaryButton({label, size, onClick}: TertiaryButtonProps) {
    const btnSize = size === "large" ? "tertiary-btn-lg font-lg-underline-semibold" : "tertiary-btn-sm font-sm-underline-semibold";
    return (
        <button className={`tertiary-btn ${btnSize}`} onClick={onClick}>
            {label}
        </button>
    )
}