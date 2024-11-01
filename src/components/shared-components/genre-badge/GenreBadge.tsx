import "./GenreBadge.css"

type GenreBadge = {
    label: string
}

export default function GenreBadge({ label }: GenreBadge) {
    return (
        <span className="genre-badge font-md-regular">
            {label}
        </span>
    )
}