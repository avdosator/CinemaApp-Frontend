import "./TertiaryButton.css"

type TertiaryButtonProps = {
    label: string,
    size: string,
    onClick?: () => void,
    color?: string,
    isDisabled?: boolean
}

export default function TertiaryButton({ label, size, onClick, color, isDisabled }: TertiaryButtonProps) {
    const btnSize = size === "large" ? "tertiary-btn-lg font-lg-underline-semibold" : "tertiary-btn-sm font-sm-underline-semibold";
    const style = color ? { color: color } : {}
    return (
        <button className={`tertiary-btn ${btnSize}`} onClick={onClick} style={style} type="button" disabled={isDisabled}>
            {label}
        </button>
    )
}