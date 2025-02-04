import "./MovieTable.css"
import { Movie } from "../../../../types/Movie";
import MovieRow from "./movie-row/MovieRow";
import { MovieTabType } from "../../../../types/MovieTabType";
import { useState } from "react";
import ApiService from "../../../../service/ApiService";
import AddMoviePopUp from "../../new-movie/pop-up/AddMoviePopUp";
import { useNavigate } from "react-router-dom";

type MovieTableProps = {
    movies: Movie[],
    showCheckbox?: boolean,
    showActions?: boolean,
    activeTab: MovieTabType
}

export default function MovieTable({ movies, showCheckbox = true, showActions = true, activeTab }: MovieTableProps) {
    const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
    const [allMoviesNotDraft3, setAllMoviesNotDraft3] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleMovieSelection = (movie: Movie) => {
        setSelectedMovies(prevSelected => {
            const isAlreadySelected = prevSelected.some(m => m.id === movie.id);
            return isAlreadySelected
                ? prevSelected.filter(m => m.id !== movie.id) // Remove if already selected
                : [...prevSelected, movie]; // Add if not selected
        });
    };

    const isAnyMovieSelected = selectedMovies.length > 0;

    const publishMovieGroup = async () => {
        if (selectedMovies.some(m => m.status === "draft-1" || m.status === "draft-2")) {
            setAllMoviesNotDraft3(true);
            return;
        }

        try {
            const jwt = localStorage.getItem("authToken");
            const headers = { Authorization: `Bearer ${jwt}` };

            // Send batch publish request
            await Promise.all(selectedMovies.map(movie =>
                ApiService.patch(`/movies/drafts/publish/${movie.id}`, {}, headers)
            ));

            navigate("/admin/movies/upcoming");
        } catch (error) {
            console.error("Failed to publish movies:", error);
        }
    };

    const archiveMovieGroup = async () => {
        try {
            const jwt = localStorage.getItem("authToken");
            const headers = { Authorization: `Bearer ${jwt}` };

            await Promise.all(selectedMovies.map(movie =>
                ApiService.patch(`/movies/archive/${movie.id}`, {}, headers)
            ));

            navigate("/admin/movies/archived");
        } catch (error) {
            console.error("Failed to archive movies:", error);
        }
    }

    const moveToDrafts = async () => {
        try {
            const jwt = localStorage.getItem("authToken");
            const headers = { Authorization: `Bearer ${jwt}` };

            await Promise.all(selectedMovies.map(movie =>
                ApiService.patch(`/movies/drafts/${movie.id}`, {}, headers)
            ));

            navigate("/admin/movies/drafts");
        } catch (error) {
            console.error("Failed to do that action", error);
        }
    }

    return (
        <>
            {allMoviesNotDraft3 && (
                <AddMoviePopUp heading="Publish Failed" text="Movies that are in progress cannot be published."
                    okayAction={setAllMoviesNotDraft3}
                />
            )}
            {/* Group Action Buttons - Only show when at least one checkbox is selected */}
            {isAnyMovieSelected && (
                <div className="group-actions-buttons font-md-semibold">
                    {activeTab === "drafts" && <button id="publishGroupBtn" onClick={publishMovieGroup}>Publish</button>}
                    {activeTab !== "archived" && <button onClick={archiveMovieGroup}>Archive</button>}
                    {activeTab !== "drafts" && <button onClick={moveToDrafts}>Move to Drafts</button>}
                </div>
            )}
            <table className="movie-table" style={isAnyMovieSelected ? { marginTop: "0px" } : {}}>
                <thead className="movie-table-heading">
                    <tr className="font-heading-caption">
                        <th>Name</th>
                        <th>Projection Date</th>
                        <th>Venue</th>
                        <th>Status</th>
                        {showActions && <th className="action-column">Action</th>}
                    </tr>
                </thead>
                <tbody className="font-lg-regular">
                    {movies.map((movie) => (
                        <MovieRow
                            key={movie.id}
                            movie={movie}
                            showCheckbox={showCheckbox}
                            showActions={showActions}
                            activeTab={activeTab}
                            isSelected={selectedMovies.some(m => m.id === movie.id)}
                            onSelect={() => toggleMovieSelection(movie)}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
}