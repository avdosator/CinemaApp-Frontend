import "./SecondaryButton.css"
import { CSSProperties } from "react";

type SecondaryButtonProps = {
    label: string,
    onClick?: () => void,
    isDisabled?: boolean,
    style?: CSSProperties,
    size: "small" | "large"
}

export default function SecondaryButton({ label, onClick, isDisabled = false, style, size }: SecondaryButtonProps) {
    return (
        <button
        className={size === "small" ? "font-sm-semibold secondary-button-small" : "font-lg-semibold secondary-button-large"}
            onClick={onClick}
            disabled={isDisabled}
            style={style}
        >
            {label}
        </button>
    );
}