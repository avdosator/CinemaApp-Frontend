import avatarImage from "../../../assets/avatar-image.jpg"
import { Movie } from "../../../types/Movie"
import "./FeaturedMovieCarousel.css"

export default function FeaturedMovieCarousel({ movies }: { movies: Movie[] }) {
    return (
        <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
            <div className="carousel-indicators">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleRide"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {movies.map((movie, index) => (
                    <div key={movie.id} className={`carousel-item ${index === 0 ? "active" : ""}`} data-bs-interval="3000">
                        <img src={avatarImage} className="d-block w-100" alt="..." />
                        <div className="carousel-movie-info">
                            <h2 className="carousel-movie-info-heading">{movie.title}</h2>
                            <p className="carousel-movie-info-text font-heading-h6">{movie.synopsis}</p>
                            <button className="carousel-movie-info-btn">Buy Ticket</button>
                        </div>
                    </div>
                ))}

                {/* <div className="carousel-item" data-bs-interval="1000">
                    <img src="https://placehold.co/1440x809" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="1000">
                    <img src="https://placehold.co/1440x811" className="d-block w-100" alt="..." />
                </div> */}
            </div>
        </div>
    )
}