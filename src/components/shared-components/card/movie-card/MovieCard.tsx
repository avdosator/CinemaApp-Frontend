import "./MovieCard.css"
import type { Movie } from "../../../../types/Movie"

export default function MovieCard({ id, title, durationInMinutes, genres, projections }: Movie) {

    //if title is too long for card then slice it to fit to card
    if (title.length >= 26) {
        title = title.slice(0, 24) + "...";
    }
    return (
        <>
            <div className="shared-card">
                <img src="https://placehold.co/270x287" alt="Movie Poster" className="shared-card-image" />
                <div className="shared-card-content">
                    <h6 className="shared-card-header font-heading-h6">{title}</h6>
                    <div className="shared-card-details font-md-regular">
                        <span>{durationInMinutes} MIN</span>
                        <div className="movie-card-separator"></div>
                        <span>{genres[0].name[0].toUpperCase() + genres[0].name.slice(1)}</span> {/* capitalize genre string */}
                    </div>
                </div>
            </div>
        </>
    )
}