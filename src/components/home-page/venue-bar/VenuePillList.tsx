import VenuePill from "././VenuePill";
import "./VenuePillList.css";

export default function VenuePillList() {

    // This is hard coded - it should represent venues from database
    const venues = [
        "Dolby Cinema",
        "Cineplexx Sarajevo",
        "Cinestar",
        "Cinema City",
        "Meeting Point",
        "Kinoteka",
        "Kino Novi Grad",
        "Cineplexx Mostar",
        "Apollo"
    ];

    return (
        <div className="venue-pill-list-container">
        <div className="venue-pill-list">
            {venues.map((venue, index) => (
                <VenuePill key={index} label={venue} />
            ))}
        </div>
        </div>
    );
}
