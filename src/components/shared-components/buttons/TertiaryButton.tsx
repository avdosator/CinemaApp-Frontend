import "./TertiaryButton.css"

type TertiaryButtonProps = {
    label: string,
    size: string,
    onClick?: () => void
}

export default function TertiaryButton({label, size, onClick}: TertiaryButtonProps) {
    return (
        <button className={size === "large" ? "tertiary-btn-lg font-lg-underline-semibold" : ""} onClick={onClick}>
            {label}
        </button>
    )
}