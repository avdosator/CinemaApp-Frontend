import { Venue } from "../../../../types/Venue";
import VenueCard from "../../../shared-components/card/venue-card/VenueCard";

type AdminPanelVenueList = {
    venues: Venue[]
}

export default function AdminPanelVenueList({ venues }: AdminPanelVenueList) {
    return (
        <div className="admin-panel-venue-list">
            {venues.map(venue => (<VenueCard key={venue.id} {...venue} />))}
        </div>
    );
}