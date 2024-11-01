import "./TimeBadge.css"

type TimeBadge = {
    label: string
}

export default function TimeBadge({label}: TimeBadge) {
    return(
        <button className="font-heading-h6 time-badge">
            {label}
        </button>
    )
}