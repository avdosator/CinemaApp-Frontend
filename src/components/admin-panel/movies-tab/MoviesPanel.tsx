import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MoviesPanel.css"
import NoMoviesAdded from "./no-movies-added/NoMoviesAdded"
import { Movie } from "../../../types/Movie";
import ApiService from "../../../service/ApiService";
import { PageResponse } from "../../../types/PageResponse";
import LoadingIndicator from "../../shared-components/loading-indicator/LoadingIndicator";
import MovieTable from "./movie-table/MovieTable";
import { MovieTabType } from "../../../types/MovieTabType";

export default function MoviesPanel() {
    const location = useLocation();
    const navigate = useNavigate();
    const activeTab = location.pathname.split("/").pop() as MovieTabType;

    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [underlineStyle, setUnderlineStyle] = useState({ width: "0px", transform: "translateX(0px)" });
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCounts, setTotalCounts] = useState<{ [key in MovieTabType]: number }>({
        drafts: 0,
        "currently-showing": 0, // quotes needed because of dash
        upcoming: 0,
        archived: 0
    });

    useEffect(() => {
        const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
        const activeTabElement = tabRefs.current[activeIndex];
        if (activeTabElement) {
            setUnderlineStyle({
                width: `${activeTabElement.offsetWidth}px`,
                transform: `translateX(${activeTabElement.offsetLeft}px)`
            });
        }
        fetchMovies(activeTab);
    }, [activeTab]);

    const fetchMovies = (tab: MovieTabType) => {
        setIsLoading(true);
        const endpoint = tab === "currently-showing" ? "/movies/active" :
            tab === "upcoming" ? "/movies/upcoming" : "";
        if (!endpoint) {
            setMovies([]);
            setIsLoading(false);
            return;
        }

        ApiService.get<PageResponse<Movie>>(endpoint, { page: 0, size: 1000 })
            .then(response => {
                setMovies(response.content);
                if (tab in totalCounts) {  // Ensure tab is a valid key before setting
                    setTotalCounts(prev => ({
                        ...prev,
                        [tab]: response.totalElements
                    }));
                }
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    };

    const tabs: { id: MovieTabType; label: string }[] = [
        { id: "drafts", label: `Drafts (${totalCounts.drafts})` },
        { id: "currently-showing", label: `Currently Showing (${totalCounts["currently-showing"]})` },
        { id: "upcoming", label: `Upcoming (${totalCounts.upcoming})` },
        { id: "archived", label: `Archived (${totalCounts.archived})` }
    ];

    return (
        <div className="movies-panel">
            <div className="movie-panel-heading-container">
                <div>
                    <h6 className="font-heading-h6" style={{ color: "#1D2939", marginBottom: "10px" }}>Movies</h6>
                    <div className="movie-tabs-container">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                ref={(el) => (tabRefs.current[index] = el)}
                                className={`movie-tab ${activeTab === tab.id ? "font-lg-semibold" : "font-lg-regular"}`}
                                onClick={() => navigate(`/admin/movies/${tab.id}`)}
                                style={{ color: activeTab === tab.id ? "#B22222" : "#1D2939" }}
                            >
                                {tab.label}
                            </button>
                        ))}
                        <div className="tab-highlight" style={underlineStyle}></div>
                    </div>

                </div>
                <button className="add-movie-btn font-lg-semibold" id="addMovieBtn1">Add Movie</button>
            </div>
            {isLoading ? (
                <LoadingIndicator />
            ) : movies.length > 0 ? (
                <MovieTable
                    movies={movies}
                    showActions={activeTab !== "currently-showing"}
                    showCheckbox={activeTab !== "currently-showing"}
                    activeTab={activeTab}
                />
            ) : (
                <NoMoviesAdded />
            )}
        </div>
    )
}