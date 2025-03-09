import { CSSProperties, ReactNode } from "react";
import "./TertiaryButton.css"

type TertiaryButtonProps = {
    label: string,
    size: string,
    onClick?: () => void,
    color?: string,
    isDisabled?: boolean,
    icon?: ReactNode,
    style?: CSSProperties
}

export default function TertiaryButton({ label, size, onClick, color, isDisabled = false, icon, style }: TertiaryButtonProps) {
    const btnSize = size === "large" ? "tertiary-btn-lg font-lg-underline-semibold" : "tertiary-btn-sm font-sm-underline-semibold";
    const combinedStyle: CSSProperties = { color, ...style }; // Merge color and custom styles

    return (
        <button className={`tertiary-btn ${btnSize}`} onClick={onClick} style={combinedStyle} type="button" disabled={isDisabled}>
            {icon && (<span>{icon}</span>)}
            {label}
        </button>
    )
}