import "./MoviesPanel.css"

export default function MoviesPanel() {
    return (
        <div className="movies-panel">
            <h6 className="font-heading-h6" style={{color: "#1D2939", marginBottom: "10px"}}>Movies</h6>
            <div className="movie-tabs-container">
                <div className="font-lg-regular movie-tab">Drafts (0)</div>
                <div className="font-lg-regular movie-tab">Currently Showing (0)</div>
                <div className="font-lg-regular movie-tab">Upcoming (0)</div>
                <div className="font-lg-regular movie-tab">Archived (0)</div>
            </div>
            <div className="full-width-horizontal-line"></div>
        </div>
    )
}