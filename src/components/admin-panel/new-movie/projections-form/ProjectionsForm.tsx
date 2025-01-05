import { useEffect, useState } from "react";
import { SelectOptionType } from "../../../../types/SelectOptionType";
import ApiService from "../../../../service/ApiService";
import { City } from "../../../../types/City";
import { PageResponse } from "../../../../types/PageResponse";
import { Venue } from "../../../../types/Venue";

export default function ProjectionsForm() {
    let [cityOptions, setCityOptions] = useState<SelectOptionType[]>();
    let [venueOptions, setVenueOptions] = useState<SelectOptionType[]>();
    let [projectionTimeOptions, setProjectionTimeOptions] = useState<SelectOptionType[]>();

    useEffect(() => {
        Promise.all([
            ApiService.get<City[]>("/cities"),
            ApiService.get<PageResponse<Venue>>("/venues"),
            ApiService.get<string[]>("projections/start-times")
        ])
            .then(([citiesResponse, venuesResponse, projectionsTimesResponse]) => {
                const cityOptions = citiesResponse.map(city => ({ value: city.id, label: city.name }));
                setCityOptions(cityOptions);
                const venueOptions = venuesResponse.content.map(venue => ({ value: venue.id, label: venue.name }));
                setVenueOptions(venueOptions);
                const projectionTimeOptions = projectionsTimesResponse.map(projectionTime => ({ value: projectionTime, label: projectionTime }))
                setProjectionTimeOptions(projectionTimeOptions);
            })
    }, []);


    return (
        <div>
            <form>

            </form>
        </div>
    )
}