import { useEffect, useState } from "react";
import TertiaryButton from "../../shared-components/buttons/tertiary-button/TertiaryButton";
import AdminPanelVenueList from "./venue-list/AdminPanelVenueList";
import "./VenuesPanel.css"
import { Venue } from "../../../types/Venue";
import ApiService from "../../../service/ApiService";
import { PageResponse } from "../../../types/PageResponse";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../shared-components/buttons/primary-button/PrimaryButton";

const PAGE_SIZE = 6;

export default function VenuesPanel() {
    const navigate = useNavigate();
    const [venues, setVenues] = useState<Venue[]>([]);
    const [total, setTotal] = useState<Number>(0);
    let [page, setPage] = useState<number>(0);
    let [isLastPage, setIsLastPage] = useState<boolean>(false);

    useEffect(() => {
        fetchVenues(0);
    }, [])

    const fetchVenues = (pageNumber: number) => {
        ApiService.get<PageResponse<Venue>>("/venues", { page: pageNumber, size: PAGE_SIZE })
            .then(response => {
                setVenues(prevVenues =>
                    pageNumber === 0 ? response.content : [...prevVenues, ...response.content]
                );
                setTotal(response.totalElements);
                setIsLastPage(response.last);
            })
            .catch(error => console.log(error));
    }

    const handleAddVenue = () => navigate("/admin/venues/new-venue");

    const handleVenueCardClick = (venue: Venue) => navigate(`/admin/venues/${venue.id}`, { state: { venue } });

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchVenues(nextPage);
    };

    return (
        <div className="venues-panel">
            <div className="venues-panel-heading-container">
                <div className="venues-panel-heading">
                    <h6 className="font-heading-h6" style={{ color: "#1D2939" }}> {`Venues (${total})`}</h6>
                    <PrimaryButton
                        label="Add Venue"
                        onClick={handleAddVenue}
                        style={{ display: "flex", alignSelf: "flex-end" }}
                        size="large"
                    />
                </div>
                <div className="full-width-horizontal-line"></div>
            </div>
            <AdminPanelVenueList venues={venues} onCardClick={handleVenueCardClick} />
            {!isLastPage && venues.length > 0 && (
                <div className="load-more-btn">
                    <TertiaryButton label="Load More" size="large" onClick={handleLoadMore} />
                </div>
            )}
        </div>
    );
}