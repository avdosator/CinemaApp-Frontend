import { Movie } from "../../../types/Movie"
import "./FeaturedMovieCarousel.css"
import FeaturedMovieInfo from "./FeaturedMovieInfo"

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
                    <FeaturedMovieInfo key={index} index={index} title={movie.title} synopsis={movie.synopsis} genre={movie.genres[0].name}/>
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