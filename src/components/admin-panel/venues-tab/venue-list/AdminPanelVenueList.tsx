import "./AdminPanelVenueList.css"
import { Venue } from "../../../../types/Venue";
import VenueCard from "../../../shared-components/card/venue-card/VenueCard";

type AdminPanelVenueList = {
    venues: Venue[],
    onCardClick: (venue: Venue) => void
}

export default function AdminPanelVenueList({ venues, onCardClick }: AdminPanelVenueList) {
    return (
        <div className="admin-panel-venue-list">
            {venues.map(venue => (
                <div onClick={() => onCardClick(venue)} key={venue.id} style={{ cursor: "pointer" }} >
                    <VenueCard key={venue.id} {...venue} />
                </div>
            ))}
        </div>
    );
}