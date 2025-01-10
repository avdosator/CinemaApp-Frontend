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
import PaginationBig from "../../shared-components/pagination/pagination-big/PaginationBig";

export default function MoviesPanel() {
    const location = useLocation();
    const navigate = useNavigate();
    const activeTab = location.pathname.split("/").pop() as MovieTabType;

    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [underlineStyle, setUnderlineStyle] = useState({ width: "0px", transform: "translateX(0px)" });
    const [pageResponse, setPageResponse] = useState<PageResponse<Movie>>({
        content: [],
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        empty: true,
        last: false
    });
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
        fetchMovies(activeTab, 0, pageResponse.pageSize);
    }, [activeTab]);

    const fetchMovies = (tab: MovieTabType, page: number, size: number) => {
        setIsLoading(true);
        const endpoint = tab === "currently-showing" ? "/movies/active" :
            tab === "upcoming" ? "/movies/upcoming" : "";
        if (!endpoint) {
            setPageResponse(prev => ({ ...prev, content: [], empty: true }));
            setIsLoading(false);
            return;
        }

        ApiService.get<PageResponse<Movie>>(endpoint, { page, size })
            .then(response => {
                setPageResponse(response);
                if (tab in totalCounts) {
                    setTotalCounts(prev => ({
                        ...prev,
                        [tab]: response.totalElements
                    }));
                }
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    };
    console.log(pageResponse.totalElements)

    const handlePageChange = (newPage: number) => {
        setPageResponse(prev => ({ ...prev, pageNumber: newPage - 1 }));
        fetchMovies(activeTab, newPage - 1, pageResponse.pageSize);
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageResponse(prev => ({ ...prev, pageSize: newSize, pageNumber: 0 }));
        fetchMovies(activeTab, 0, newSize);
    };


    const tabs: { id: MovieTabType; label: string }[] = [
        { id: "drafts", label: `Drafts (${activeTab === "drafts" ? pageResponse.totalElements : 0})` },
        { id: "currently-showing", label: `Currently Showing (${activeTab === "currently-showing" ? pageResponse.totalElements : 0})` },
        { id: "upcoming", label: `Upcoming (${activeTab === "upcoming" ? pageResponse.totalElements : 0})` },
        { id: "archived", label: `Archived (${activeTab === "archived" ? pageResponse.totalElements : 0})` }
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
            ) : pageResponse.content.length > 0 ? (
                <MovieTable
                    movies={pageResponse.content}
                    showActions={activeTab !== "currently-showing"}
                    showCheckbox={activeTab !== "currently-showing"}
                    activeTab={activeTab}
                />
            ) : (
                <NoMoviesAdded />
            )}
            <PaginationBig
                currentPage={pageResponse.pageNumber + 1}
                totalPages={pageResponse.totalPages}
                totalItems={pageResponse.totalElements}
                pageSize={pageResponse.pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </div>
    )
}