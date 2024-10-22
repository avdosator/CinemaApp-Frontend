import "./VenueCard.css"

type VenueCardProps = {
    venue: {
        id: string,
        name: string,
        street: string,
        streetNumber: string,
        city: {
            id: string,
            name: string,
            postalCode: number,
            country: string
        },
        phone: string
    }
}

export default function VenueCard({ venue }: VenueCardProps) {
    const { id, name, street, streetNumber, city, phone } = venue;
    return (
        <>
            <div className="movie-card">
                <img src="https://placehold.co/270x287" alt="Venue Poster" className="movie-card-image" />
                <div className="movie-card-content">
                    <h5 className="movie-card-header">{name}</h5>
                    <div className="movie-card-details">
                        <div>{`${street} ${streetNumber}, ${city.name} ${city.postalCode}`}</div>
                    </div>
                </div>
            </div>
        </>
    )
}