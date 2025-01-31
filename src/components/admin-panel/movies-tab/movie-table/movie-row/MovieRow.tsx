import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Movie } from "../../../../../types/Movie";
import MovieStatusBadge from "../movie-status-badge/MovieStatusBadge";
import { MovieTabType } from "../../../../../types/MovieTabType";

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
            const venueName = projection.hall.venue.name.split(" ").slice(0, 2).join(" "); // Extracting first two words
            venueSet.add(venueName);
        });
        return Array.from(venueSet);
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
                    const coverPhoto = movie.photos.find(photo => photo.id === movie.coverPhotoId);
                    return coverPhoto ? (
                        <img src={coverPhoto.url} alt={movie.title} className="movie-table-row-img" />
                    ) : (
                        <img src="https://placehold.co/40x40" />
                    );
                })()}
                {movie.title}
            </td>
            <td>
                {movie.projections
                    .map(projection =>
                        `${formatProjectionDate(projection.startDate)} - ${formatProjectionDate(projection.endDate)}`
                    )
                    .join(", ")}
            </td>
            <td>{renderVenuesColumn(movie)}</td>
            <td>
                <MovieStatusBadge
                    statusType={activeTab}
                    daysRemaining={activeTab === "currently-showing" || activeTab === "upcoming"
                        ? calculateDaysRemaining(movie, activeTab)
                        : undefined}
                />
            </td>
            {showActions && (
                <td>
                    <button className="movie-table-action-button">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </td>
            )}
        </tr>
    );
}
