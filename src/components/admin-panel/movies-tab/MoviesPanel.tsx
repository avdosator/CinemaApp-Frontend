import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MoviesPanel.css"
import NoMoviesAdded from "./no-movies-added/NoMoviesAdded"
import { Movie } from "../../../types/Movie";
import ApiService from "../../../service/ApiService";
import { PageResponse } from "../../../types/PageResponse";
import LoadingIndicator from "../../shared-components/loading-indicator/LoadingIndicator";
import MovieTable from "./movie-table/MovieTable";

export default function MoviesPanel() {
    const location = useLocation();
    const navigate = useNavigate();
    const activeTab = location.pathname.split("/").pop() as "drafts" | "currently-showing" | "upcoming" | "archived";

    const tabs: { id: "drafts" | "currently-showing" | "upcoming" | "archived"; label: string }[] = [
        { id: "drafts", label: "Drafts (0)" },
        { id: "currently-showing", label: "Currently Showing (0)" },
        { id: "upcoming", label: "Upcoming (0)" },
        { id: "archived", label: "Archived (0)" }
    ];

    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [underlineStyle, setUnderlineStyle] = useState({ width: "0px", transform: "translateX(0px)" });
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);


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

    const fetchMovies = (tab: string) => {
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
                console.log(response.totalElements);
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    };

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