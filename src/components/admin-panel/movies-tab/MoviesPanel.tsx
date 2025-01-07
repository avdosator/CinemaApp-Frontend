import "./MoviesPanel.css"
import NoMoviesAdded from "./no-movies-added/NoMoviesAdded"

export default function MoviesPanel() {
    return (
        <div className="movies-panel">
            <div className="movie-panel-heading-container">
                <div>
                    <h6 className="font-heading-h6" style={{ color: "#1D2939", marginBottom: "10px" }}>Movies</h6>
                    <div className="movie-tabs-container">
                        <div className="font-lg-regular movie-tab">Drafts (0)</div>
                        <div className="font-lg-regular movie-tab">Currently Showing (0)</div>
                        <div className="font-lg-regular movie-tab">Upcoming (0)</div>
                        <div className="font-lg-regular movie-tab">Archived (0)</div>
                    </div>
                </div>
                <button className="add-movie-btn font-lg-semibold" id="addMovieBtn1">Add Movie</button>
            </div>
            <div className="full-width-horizontal-line"></div>
            <NoMoviesAdded />
        </div>
    )
}