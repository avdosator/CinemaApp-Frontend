import "./PaginationSmall.css"

export default function PaginationSmall() {
    return (
        <>
            <div className="pagination-sm">
                <span className="pagination-sm-info">Showing
                    <span className="pagination-sm-num"> 4 </span>
                    out of
                    <span className="pagination-sm-num"> 10 </span>
                </span>
                <button className="pagination-sm-arrow" disabled>←</button>
                <button className="pagination-sm-arrow">→</button>
            </div>
        </>
    )
}