import { Movie } from "../../../../types/Movie";

type MovieTableProps = {
    movies: Movie[];
    showCheckbox?: boolean;
    showActions?: boolean;
}

export default function MovieTable({ movies, showCheckbox = true, showActions = true }: MovieTableProps) {
    return (
        <div className="movie-table">
            <table>
                <thead>
                    <tr>
                        {showCheckbox && <th></th>}
                        <th>Name</th>
                        <th>Projection Date</th>
                        <th>Venue</th>
                        <th>Status</th>
                        {showActions && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            {showCheckbox && <td><input type="checkbox" /></td>}
                            <td>{movie.title}</td>
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
        </div>
    );
}