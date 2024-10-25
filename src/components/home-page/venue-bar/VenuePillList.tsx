import VenuePill from "././VenuePill";
import "./VenuePillList.css";

export default function VenuePillList() {
    const venues = [
        "Dolby Cinema",
        "Cineplex",
        "Cinestar",
        "Cinema City",
        "Meeting Point",
        "Kinoteka",
        "Kino Novi Grad",
        "Cineplexx",
    ];

    return (
        <div className="venue-pill-list">
            {venues.map((venue, index) => (
                <VenuePill key={index} label={venue} />
            ))}
        </div>
    );
}
