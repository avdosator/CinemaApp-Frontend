import { Venue } from "../../../../types/Venue";
import "./VenueCard.css"

export default function VenueCard({ id, name, street, streetNumber, city, photo }: Venue) {

    //if venue details are too long for card then slice it to fit to card
    let details = `${street} ${streetNumber}, ${city.name} ${city.postalCode}`;
    if (details.length + 4 >= 27) {
        details = `${street} ${streetNumber}, ${city.name} ${city.postalCode}`.slice(0, 30) + "...";
    }
    return (
        <>
            <div className="shared-card">
                <img src={photo.url} alt="Venue Poster" className="shared-card-image" />
                <div className="shared-card-content">
                    <h6 className="shared-card-header font-heading-h6">{name}</h6>
                    <div className="shared-card-details">
                        <div>{details}</div>
                    </div>
                </div>
            </div>
        </>
    )
}