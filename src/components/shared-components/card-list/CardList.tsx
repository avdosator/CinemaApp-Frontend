import { useState } from "react";
import type { CardList } from "../../../types/CardList"
import "../../shared-components/card/SharedCard.css"
import PaginationSmall from "../pagination/PaginationSmall"
import "./CardList.css"
import { Venue } from "../../../types/Venue";
import { Movie } from "../../../types/Movie";
import { Link } from "react-router-dom";

export default function CardList<T extends Movie | Venue>({ heading, elements, route, CardComponent }: CardList<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalItems = elements.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentStart = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const currentEnd = Math.min(currentPage * itemsPerPage, totalItems);
    let lastPageStyle = currentEnd === totalItems && (totalItems % 4) > 0 ? { justifyContent: "start", gap: "10px" } : {};

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const displayedItems = elements.slice(currentStart - 1, currentEnd);
    return (
        <>
            <div className="card-list-container">
                <div className="card-list-wrapper">
                    <section className="card-list-content">
                        <div className="card-list-heading">
                            <h2 className="font-heading-h4">{heading}</h2>
                            <Link className="font-lg-semibold" to={route}>See All</Link>
                        </div>
                        <div className="card-list" style={lastPageStyle} >
                            {displayedItems.map(item => (
                                <CardComponent key={(item as any).id} {...item} />
                            ))}
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