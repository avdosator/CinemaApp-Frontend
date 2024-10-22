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
            <div className="shared-card">
                <img src="https://placehold.co/270x287" alt="Venue Poster" className="shared-card-image" />
                <div className="shared-card-content">
                    <h5 className="shared-card-header">{name}</h5>
                    <div className="shared-card-details">
                        <div>{`${street} ${streetNumber}, ${city.name} ${city.postalCode}`}</div>
                    </div>
                </div>
            </div>
        </>
    )
}