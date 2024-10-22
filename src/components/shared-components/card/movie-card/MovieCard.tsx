import "./MovieCard.css"

type MovieCardProps = {
    movie: {
        id: string,
        title: string,
        duration: number,
        genre: string
        // add other props
    }
}

export default function MovieCard({movie}: MovieCardProps) {
    const {id, title, duration, genre} = movie;
    return (
        <>
            <div className="shared-card">
                <img src="https://placehold.co/270x287" alt="Movie Poster" className="shared-card-image" />
                <div className="shared-card-content">
                    <h5 className="shared-card-header">{title}</h5>
                    <div className="shared-card-details">
                        <span>{duration} MIN</span>
                        <div className="movie-card-separator"></div>
                        <span>{genre}</span>
                    </div>
                </div>
            </div>
        </>
    )
}