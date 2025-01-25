import { useEffect, useState } from "react";
import TertiaryButton from "../../shared-components/buttons/TertiaryButton";
import AdminPanelVenueList from "./venue-list/AdminPanelVenueList";
import "./VenuesPanel.css"
import { Venue } from "../../../types/Venue";
import ApiService from "../../../service/ApiService";
import { PageResponse } from "../../../types/PageResponse";

const PAGE_SIZE = 6;

export default function VenuesPanel() {
    const [venues, setVenues] = useState<Venue[]>([]);
    let [page, setPage] = useState<number>(0);
    let [isLastPage, setIsLastPage] = useState<boolean>(false);

    useEffect(() => {
        fetchVenues(0);
    }, [])

    const fetchVenues = (pageNumber: number) => {
        ApiService.get<PageResponse<Venue>>("/venues", { page: pageNumber, size: PAGE_SIZE } )
            .then(response => {
                setVenues(prevVenues =>
                    pageNumber === 0 ? response.content : [...prevVenues, ...response.content]
                );

                setIsLastPage(response.last);
            })
            .catch(error => console.log(error));
    }

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchVenues(nextPage);
    };

    return (
        <div className="venues-panel">
            <div className="venues-panel-heading-container">
                <div className="venues-panel-heading">
                    <h6 className="font-heading-h6" style={{ color: "#1D2939" }}>Venues (7)</h6>
                    <button className="add-movie-btn font-lg-semibold" style={{ alignSelf: "flex-start" }} onClick={() => console.log("create venue")}>Add Venue</button>
                </div>
                <div className="full-width-horizontal-line"></div>
            </div>
            <AdminPanelVenueList venues={venues} />
            {!isLastPage && venues.length > 0 && (
                <div className="load-more-btn">
                    <TertiaryButton label="Load More" size="large" onClick={handleLoadMore} />
                </div>
            )}
        </div>

    );
}