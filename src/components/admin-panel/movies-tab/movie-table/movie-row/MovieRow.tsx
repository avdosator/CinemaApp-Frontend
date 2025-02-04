import "./MovieRow.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Movie } from "../../../../../types/Movie";
import MovieStatusBadge from "../movie-status-badge/MovieStatusBadge";
import { MovieTabType } from "../../../../../types/MovieTabType";
import placeholderImage from "../../../../../assets/upload-photo-placeholder.jpg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type MovieRowProps = {
    movie: Movie;
    showCheckbox?: boolean;
    showActions?: boolean;
    activeTab: MovieTabType
};

export default function MovieRow({
    movie,
    showCheckbox = true,
    showActions = true,
    activeTab,
}: MovieRowProps) {
    const navigate = useNavigate();
    const [isActionsElementOpened, setIsActionsElementOpened] = useState<boolean>(false);

    const toggleActions = () => {
        setIsActionsElementOpened((prev) => !prev);
    };

    const handleEditMovie = () => {
        navigate("/admin/movies/new-movie", { state: { movie } }); // Pass movie object
    };
    

    const formatProjectionDate = (date: Date | string): string => {
        const validDate = typeof date === "string" ? new Date(date) : date;
        return validDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const getUniqueVenues = (movie: Movie): string[] => {
        const venueSet = new Set<string>();

        movie.projections.forEach(projection => {
            if (projection.hall && projection.hall.venue) {
                const venueName = projection.hall.venue.name.split(" ").slice(0, 2).join(" "); // Extracting first two words
                venueSet.add(venueName);
            }
        });

        return venueSet.size > 0 ? Array.from(venueSet) : ["N/A"];
    };

    const renderVenuesColumn = (movie: Movie): string => {
        const uniqueVenues = getUniqueVenues(movie);
        const maxVisibleVenues = 2;

        // If there are more than 2 venues, show +1, +2 notation
        if (uniqueVenues.length > maxVisibleVenues) {
            const displayedVenues = uniqueVenues.slice(0, maxVisibleVenues).join(", ");
            return `${displayedVenues} +${uniqueVenues.length - maxVisibleVenues}`;
        }

        return uniqueVenues.join(", ");
    };

    const calculateDaysRemaining = (movie: Movie, activeTab: "currently-showing" | "upcoming"): number | undefined => {
        const today = new Date();

        if (activeTab === "currently-showing") {
            const latestEndDate = Math.max(
                ...movie.projections.map(projection =>
                    (projection.endDate instanceof Date ? projection.endDate : new Date(projection.endDate)).getTime()
                )
            );
            return Math.max(Math.ceil((latestEndDate - today.getTime()) / (1000 * 60 * 60 * 24)), 0);
        }

        if (activeTab === "upcoming") {
            const earliestStartDate = Math.min(
                ...movie.projections.map(projection =>
                    (projection.startDate instanceof Date ? projection.startDate : new Date(projection.startDate)).getTime()
                )
            );
            return Math.max(Math.ceil((earliestStartDate - today.getTime()) / (1000 * 60 * 60 * 24)), 0);
        }
    };

    return (
        <tr>
            <td>
                {showCheckbox && <input type="checkbox" style={{ marginRight: "6px" }} />}
                {(() => {
                    if (!movie.photos || movie.photos.length === 0) {
                        return <img src={placeholderImage} alt="No image available" className="movie-table-row-img" />;
                    }

                    const coverPhoto = movie.photos.find(photo => photo.id === movie.coverPhotoId);
                    return coverPhoto ? (
                        <img src={coverPhoto.url} alt={movie.title} className="movie-table-row-img" />
                    ) : (
                        <img src={placeholderImage} alt="No image available" className="movie-table-row-img" />
                    );
                })()}
                {movie.title}
            </td>
            <td>
                {`${formatProjectionDate(movie.projections[0].startDate)} - ${formatProjectionDate(movie.projections[0].endDate)}`}
            </td>
            <td>{renderVenuesColumn(movie)}</td>
            <td>
                <MovieStatusBadge
                    statusType={activeTab}
                    daysRemaining={
                        activeTab === "currently-showing" || activeTab === "upcoming"
                            ? calculateDaysRemaining(movie, activeTab)
                            : undefined
                    }
                    draftStep={
                        movie.status === "draft-1" ? 1 :
                            movie.status === "draft-2" ? 2 :
                                movie.status === "draft-3" ? 3 :
                                    undefined
                    }
                />

            </td>
            {showActions && (
                <td style={{ position: "relative", overflow: "visible" }}>
                    <button className="movie-table-action-button" onClick={toggleActions}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                    {isActionsElementOpened && (
                        <div className="user-actions-dropdown-menu">
                            {activeTab === "drafts" ? (
                                <>
                                    <button className="dropdown-item font-lg-regular" onClick={handleEditMovie}>Edit</button>
                                    <button className="dropdown-item font-lg-regular">Publish</button>
                                    <button className="dropdown-item font-lg-regular">Archive</button>
                                </>
                            ) : activeTab === "upcoming" ? (
                                <>
                                    <button className="dropdown-item font-lg-regular">Move to Drafts</button>
                                    <button className="dropdown-item font-lg-regular">Archive</button>
                                </>
                            ) : (
                                <button className="dropdown-item font-lg-regular">Move to Drafts</button>

                            )}

                        </div>
                    )}
                </td>
            )}
        </tr>
    );
}
