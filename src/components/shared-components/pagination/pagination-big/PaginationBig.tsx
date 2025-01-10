import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./PaginationBig.css"

export default function PaginationBig() {
    return (
        <div className="pagination-big font-sm-regular">
            <div className="showing-section">
                Showing <span className="font-sm-semibold">10</span> out of <span className="font-sm-semibold">12</span> items.
            </div>
            <div className="pagination-big-control">
                <button>
                    <FontAwesomeIcon icon={faAnglesLeft} width={16} height={16} />
                </button>
                <button>
                    <FontAwesomeIcon icon={faAngleLeft} width={16} height={16} />
                </button>
                <span>Page</span>
                <span className="pagination-big-current-page" >1</span>
                <span>out of</span>
                <span className="font-sm-semibold" style={{ color: "#101828" }}>2</span>
                <button>
                    <FontAwesomeIcon icon={faAngleRight} width={16} height={16} />
                </button>
                <button>
                    <FontAwesomeIcon icon={faAnglesRight} width={16} height={16} />
                </button>
            </div>
            <div className="pagination-big-items-per-page">
                <span>Display</span>
                <span></span>
                <span>items per page.</span>
            </div>
        </div>
    )
}