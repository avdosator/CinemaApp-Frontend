import "./MovieTable.css"
import { Movie } from "../../../../types/Movie";
import MovieRow from "./movie-row/MovieRow";
import { MovieTabType } from "../../../../types/MovieTabType";

type MovieTableProps = {
    movies: Movie[],
    showCheckbox?: boolean,
    showActions?: boolean,
    activeTab: MovieTabType
}

export default function MovieTable({ movies, showCheckbox = true, showActions = true, activeTab }: MovieTableProps) {

    return (
        <table className="movie-table">
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
                    />
                ))}
            </tbody>
        </table>
    );
}