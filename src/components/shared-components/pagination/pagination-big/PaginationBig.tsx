import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./PaginationBig.css"

type PaginationBigProps = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
};

export default function PaginationBig({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
    onPageSizeChange
}: PaginationBigProps) {

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(e.target.value);
        onPageSizeChange(newSize);
    };

    return (
        <div className="pagination-big font-sm-regular">
            <div className="showing-section">
                Showing <span className="font-sm-semibold">{pageSize}</span> out of <span className="font-sm-semibold">{totalItems}</span> items.
            </div>
            <div className="pagination-big-control">
                <button disabled={currentPage === 1} onClick={() => onPageChange(1)}>
                    <FontAwesomeIcon icon={faAnglesLeft} width={16} height={16} />
                </button>
                <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                    <FontAwesomeIcon icon={faAngleLeft} width={16} height={16} />
                </button>
                <span>Page</span>
                <span className="pagination-big-current-page" >{currentPage}</span>
                <span>out of</span>
                <span className="font-sm-semibold" style={{ color: "#101828" }}>{totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                    <FontAwesomeIcon icon={faAngleRight} width={16} height={16} />
                </button>
                <button disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
                    <FontAwesomeIcon icon={faAnglesRight} width={16} height={16} />
                </button>
            </div>
            <div className="pagination-big-items-per-page">
                <span>Display</span>
                <select
                    className="pagination-select"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                <span>items per page.</span>
            </div>
        </div>
    )
}