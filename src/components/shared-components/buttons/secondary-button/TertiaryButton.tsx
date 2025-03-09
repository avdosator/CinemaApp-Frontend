import { CSSProperties } from "react";

type SecondaryButtonProps = {
    label: string,
    onClick?: () => void,
    isDisabled?: boolean,
    style?: CSSProperties
}

export default function SecondaryButton({ label, onClick, isDisabled = false, style }: SecondaryButtonProps) {
    return (
        <button
            className="primary-button font-lg-semibold"
            onClick={onClick}
            disabled={isDisabled}
            style={style}
        >
            {label}
        </button>
    );
}