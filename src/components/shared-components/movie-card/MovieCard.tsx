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
            <div className="movie-card">
                <img src="https://placehold.co/270x287" alt="Movie Poster" className="movie-card-image" />
                <div className="movie-card-content">
                    <h5 className="movie-card-header">{title}</h5>
                    <div className="movie-card-details">
                        <span>{duration} MIN</span>
                        <div className="movie-card-separator"></div>
                        <span>{genre}</span>
                    </div>
                </div>
            </div>
        </>
    )
}