import { CSSProperties } from "react";
import "./PrimaryButton.css"

type PrimaryButtonProps = {
    label: string,
    onClick?: () => void,
    isDisabled?: boolean,
    isFullWidth?: boolean,
    style?: CSSProperties,
    size: "small" | "large"
}

export default function PrimaryButton({ label, onClick, isDisabled = false, isFullWidth = false, style, size }: PrimaryButtonProps) {
    const combinedStyle: CSSProperties = { ...style, width: isFullWidth ? "100%" : "auto" };
    return (
        <button
            className={size === "small" ? "font-sm-semibold primary-button-small" : "font-lg-semibold primary-button-large"}
            onClick={onClick}
            disabled={isDisabled}
            style={combinedStyle}
        >
            {label}
        </button>
    );
}