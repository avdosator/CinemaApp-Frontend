import avatarImage from "../../../assets/avatar-image.jpg"
import "./FeaturedMovieInfo.css"

type FeaturedMovieInfoProps = {
    index: number,
    title: string,
    synopsis: string,
    genre: string
}

export default function FeaturedMovieInfo({index, title, synopsis, genre}: FeaturedMovieInfoProps) {
    return (
        <div className={`carousel-item ${index === 0 ? "active" : ""}`} data-bs-interval="3000">
            <img src={avatarImage} className="d-block w-100" alt="..." />
            <div className="carousel-movie-info">
                <div className="badge font-md-regular">{genre}</div>
                <h2 className="carousel-movie-info-heading">{title}</h2>
                <p className="carousel-movie-info-text font-heading-h6">{synopsis}</p>
                <button className="carousel-movie-info-btn">Buy Ticket</button>
            </div>
        </div>
    )
}