import { useState } from "react";
import { CardListProps } from "../../../types/CardListType"
import "../../shared-components/card/SharedCard.css"
import MovieCard from "../card/movie-card/MovieCard";
import VenueCard from "../card/venue-card/VenueCard";
import PaginationSmall from "../pagination/PaginationSmall"
import "./CardList.css"

export default function CardList({ elements }: CardListProps) {
    const { heading, movies, venues } = elements;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const items = movies || venues || [];
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentStart = (currentPage - 1) * itemsPerPage + 1;
    const currentEnd = Math.min(currentPage * itemsPerPage, totalItems);
    

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const displayedItems = items.slice(currentStart - 1, currentEnd);
    return (
        <>
            <div className="card-list-container">
                <div className="card-list-wrapper">
                    <section className="card-list-content">
                        <div className="card-list-heading">
                            <h2 className="font-heading-h4">{heading}</h2>
                            <a className="font-lg-semibold" href="">See All</a>
                        </div>
                        <div className="card-list" >
                            
                        </div>
                    </section>
                    <div className="pagination-sm-container">
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
                </div>
            </div>
        </>
    )
}