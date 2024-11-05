import "./TimeBadge.css"

type TimeBadge = {
    label: string,
    isSelected: boolean,
    onClick: () => void
}

export default function TimeBadge({ label, isSelected, onClick }: TimeBadge) {
    return (
        <button className={`font-heading-h6 time-badge ${isSelected ? "selected" : ""}`} onClick={onClick}>
            {label}
        </button>
    )
}