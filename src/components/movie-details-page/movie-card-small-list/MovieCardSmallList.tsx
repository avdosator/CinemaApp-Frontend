import { useEffect, useState } from "react";
import MovieCardSmall from "../../shared-components/card/movie-card-small/MovieCardSmall";
import { Movie } from "../../../types/Movie";
import ApiService from "../../../service/ApiService";
import { PageResponse } from "../../../types/PageResponse";
import PaginationSmall from "../../shared-components/pagination/PaginationSmall";
import { useActiveMovies } from "../../../context/movie-context/MovieContext";

export default function MovieCardSmallList() {
    const [movies, setMovies] = useState<Movie[] | undefined>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalItems = movies.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentStart = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const currentEnd = Math.min(currentPage * itemsPerPage, totalItems);
    let lastPageStyle = currentEnd === totalItems && (totalItems % 4) > 0 ? { justifyContent: "start", gap: "10px" } : {};

    setMovies(useActiveMovies()?.content);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const displayedItems = movies.slice(currentStart - 1, currentEnd);

    return (
        <div className="movie-card-small-container">
            <h5 className="font-heading-h6" style={{ color: "#1D2939" }}>See also</h5>
            <div className="movie-card-small-list">
                {displayedItems.map(item => (
                    (<MovieCardSmall />)
                ))}
            </div>
            <PaginationSmall
                currentStart={currentStart}
                currentEnd={currentEnd}
                totalItems={totalItems}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
                hasNext={currentPage < totalPages}
                hasPrev={currentPage > 1}
            />
        </div>
    )
}