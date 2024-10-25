import avatarImage from "../../assets/avatar-image.jpg"

export default function FeaturedMovieCarousel() {
    return (
        <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="3000">
                    <img src={avatarImage} className="d-block w-100" alt="..." />
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