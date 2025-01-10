import type { PaginationSmall } from "../../../../types/PaginationSmall"
import "./PaginationSmall.css"

export default function PaginationSmall({
    currentStart,
    currentEnd,
    totalItems,
    onNext,
    onPrev,
    hasNext,
    hasPrev
}: PaginationSmall) {
    return (
        <>
            <div className="pagination-sm">
                <span className="font-lg-regular">Showing
                    <span className="pagination-sm-num font-lg-semibold"> {currentStart} </span>
                    -
                    <span className="pagination-sm-num font-lg-semibold"> {currentEnd} </span>
                    out of
                    <span className="pagination-sm-num font-lg-semibold"> {totalItems} </span>
                </span>
                {/* left arrow */}
                <button className="pagination-sm-btn" onClick={onPrev} disabled={!hasPrev}>
                    <div className="pagination-sm-arrow">
                        <svg className="dis" xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                    </div>
                </button>
                {/* right arrow */}
                <button className="pagination-sm-btn" onClick={onNext} disabled={!hasNext}>
                    <div className="pagination-sm-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                    </div>
                </button>
            </div>
        </>
    )
}
