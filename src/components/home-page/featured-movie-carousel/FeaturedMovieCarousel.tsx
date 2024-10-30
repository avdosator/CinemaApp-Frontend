import avatarImage from "../../../assets/avatar-image.jpg"
import { Movie } from "../../../types/Movie"
import "./FeaturedMovieCarousel.css"

export default function FeaturedMovieCarousel({ movies }: { movies: Movie[] }) {
    return (
        <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="3000000000000">
                    <img src={avatarImage} className="d-block w-100" alt="..." />
                    <div className="carousel-movie-info">
                        <h2 className="carousel-movie-info-heading">Avatar: The Way of Water</h2>
                        <p className="carousel-movie-info-text font-heading-h6">Jake Sully lives with his newfound family formed <br></br> on the extrasolar moon Pandora.</p>
                        <button className="carousel-movie-info-btn">Buy Ticket</button>
                    </div>
                </div>
                <div className="carousel-item" data-bs-interval="1000">
                    <img src="https://placehold.co/1440x809" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="1000">
                    <img src="https://placehold.co/1440x811" className="d-block w-100" alt="..." />
                </div>
            </div>
        </div>
    )
}