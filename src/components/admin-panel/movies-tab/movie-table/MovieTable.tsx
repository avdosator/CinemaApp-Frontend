import "./MovieTable.css"
import { Movie } from "../../../../types/Movie";

type MovieTableProps = {
    movies: Movie[];
    showCheckbox?: boolean;
    showActions?: boolean;
}

export default function MovieTable({ movies, showCheckbox = true, showActions = true }: MovieTableProps) {
    return (
        <table className="movie-table">
            <thead className="movie-table-heading">
                <tr className="font-heading-caption">
                    {showCheckbox && <th></th>}
                    <th>Name</th>
                    <th>Projection Date</th>
                    <th>Venue</th>
                    <th>Status</th>
                    {showActions && <th>Action</th>}
                </tr>
            </thead>
            <tbody className="font-lg-regular">
                {movies.map((movie) => (
                    <tr key={movie.id}>
                        {showCheckbox && <td><input type="checkbox" /></td>}
                        <td>
                            {(() => {
                                const coverPhoto = movie.photos.find(photo => photo.id === movie.coverPhotoId);
                                return coverPhoto ? (
                                    <img src={coverPhoto.url} alt={movie.title} className="movie-table-row-img" />
                                ) : (<img src="https://placehold.co/40x40" />);
                            })()}
                            {movie.title}
                        </td>
                        <td>
                            {movie.projections.map(projection =>
                                `${projection.startDate} - ${projection.endDate}`
                            ).join(", ")}
                        </td>
                        <td>All Venues</td>
                        <td>Status Here</td>
                        {showActions && <td><button>...</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}