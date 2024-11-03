import "./TertiaryButton.css"

type TertiaryButtonProps = {
    label: string,
    size: string
}

export default function TertiaryButton({label, size}: TertiaryButtonProps) {
    return (
        <button className={size === "large" ? "tertiary-btn-lg font-lg-underline-semibold" : ""}>
            {label}
        </button>
    )
}