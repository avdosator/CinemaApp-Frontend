import { CSSProperties } from "react";
import "./PrimaryButton.css"

type PrimaryButtonProps = {
    label: string,
    onClick?: () => void,
    isDisabled?: boolean,
    isFullWidth?: boolean,
    style?: CSSProperties
}

export default function PrimaryButton({ label, onClick, isDisabled = false, isFullWidth = false, style }: PrimaryButtonProps) {
    const combinedStyle: CSSProperties = { ...style, width: isFullWidth ? "100%" : "auto" };
    return (
        <button
            className="primary-button font-lg-semibold"
            onClick={onClick}
            disabled={isDisabled}
            style={combinedStyle}
        >
            {label}
        </button>
    );
}