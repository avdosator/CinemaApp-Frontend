export type VenueCardType = {
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
    // add more later
}

export type VenueCardProps = {
    venue: VenueCardType
}