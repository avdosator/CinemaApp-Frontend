import "./ProjectionsForm.css"
import "../general-form/GeneralForm.css"
import { useEffect, useState } from "react";
import { SelectOptionType } from "../../../../types/SelectOptionType";
import ApiService from "../../../../service/ApiService";
import { City } from "../../../../types/City";
import { PageResponse } from "../../../../types/PageResponse";
import { Venue } from "../../../../types/Venue";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectionsFormData } from "../../../../types/FormData";
import ProjectionGroup from "./projection-group/ProjectionGroup";

const timeOptions = Array.from({ length: 16 }, (_, i) => {
    const hours = (8 + i).toString().padStart(2, "0");
    return { value: `${hours}:00`, label: `${hours}:00` };
});

export default function ProjectionsForm() {
    let [cityOptions, setCityOptions] = useState<SelectOptionType[]>();
    let [venueOptions, setVenueOptions] = useState<SelectOptionType[]>();
    const [projections, setProjections] = useState<ProjectionsFormData[]>([
        { city: null, venue: null, time: "" }
    ]);

    useEffect(() => {
        Promise.all([
            ApiService.get<City[]>("/cities"),
            ApiService.get<PageResponse<Venue>>("/venues"),
        ])
            .then(([citiesResponse, venuesResponse]) => {
                const cityOptions = citiesResponse.map(city => ({ value: city.id, label: city.name }));
                setCityOptions(cityOptions);
                const venueOptions = venuesResponse.content.map(venue => ({ value: venue.id, label: venue.name }));
                setVenueOptions(venueOptions);
            })
    }, []);

    const handleGroupChange = (index: number, field: keyof ProjectionsFormData, value: any) => {
        setProjections(prevProjections =>
            prevProjections.map((group, i) =>
                i === index ? { ...group, [field]: value } : group
            )
        );
    };

    const handleDeleteGroup = (index: number) => {
        setProjections(prevProjections => prevProjections.filter((_, i) => i !== index));
    };

    const handleAddProjectionGroup = () => {
        setProjections(prevProjections => [
            ...prevProjections,
            { city: null, venue: null, time: "" }
        ]);
    };

    const isLastGroupFilled = () => {
        const lastGroup = projections[projections.length - 1];
        return lastGroup.city && lastGroup.venue && lastGroup.time;
    };

    return (
        <form className="projections-form">
            {projections.map((group, index) => (
                <ProjectionGroup
                    key={index}
                    formData={group}
                    cityOptions={cityOptions!}
                    venueOptions={venueOptions!}
                    timeOptions={timeOptions}
                    onChange={(field, value) => handleGroupChange(index, field, value)}
                    onDelete={() => handleDeleteGroup(index)}
                />
            ))}
            <button
                className="projection-form-add-btn"
                onClick={handleAddProjectionGroup}
                disabled={!isLastGroupFilled()}
                style={isLastGroupFilled() ? { color: "#B22222" } : { color: "#D0D5DD" }}
            >
                <FontAwesomeIcon icon={faPlus} height={24} />
                <span className="font-lg-underline-semibold">Add Projection</span>
            </button>
        </form>
    )
}