import "./VenueCard.css"

type VenueCardProps = {
    venue: {
        id: String,
        name: String,
        street: String,
        streetNumber: String,
        city: {
            id: String,
            name: String,
            postalCode: Number,
            country: String
        },
        phone: String
    }
}

export default function VenueCard({ venue }: VenueCardProps) {
    const { id, name, street, streetNumber, city, phone } = venue;
    return (
        <>
            <div className="movie-card">
                <img src="https://placehold.co/270x287" alt="Venue Poster" className="movie-card-image" />
                <div className="movie-card-content">
                    <h5 className="movie-card-header">{venue.name}</h5>
                    <div className="movie-card-details">
                        <div>{`${street} ${streetNumber}, ${city.name} ${city.postalCode}`}</div>
                    </div>
                </div>
            </div>
        </>
    )
}