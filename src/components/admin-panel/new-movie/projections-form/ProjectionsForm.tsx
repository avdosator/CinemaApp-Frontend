import "./ProjectionsForm.css"
import "../general-form/GeneralForm.css"
import { useEffect, useState } from "react";
import { SelectOptionType } from "../../../../types/SelectOptionType";
import ApiService from "../../../../service/ApiService";
import { City } from "../../../../types/City";
import { PageResponse } from "../../../../types/PageResponse";
import { Venue } from "../../../../types/Venue";
import { faBuilding, faClock, faLocationPin, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { ProjectionsFormData } from "../../../../types/FormData";

const timeOptions = Array.from({ length: 16 }, (_, i) => {
    const hours = (8 + i).toString().padStart(2, "0");
    return { value: `${hours}:00`, label: `${hours}:00` };
});

export default function ProjectionsForm() {
    let [cityOptions, setCityOptions] = useState<SelectOptionType[]>();
    let [venueOptions, setVenueOptions] = useState<SelectOptionType[]>();

    let [formData, setFormData] = useState<ProjectionsFormData>({
        city: null,
        venue: null,
        time: ""
    });

    const handleChange = (field: keyof ProjectionsFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

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

    return (
        <form className="projections-form">
            <div className="add-projection-select-group">
                <div className="add-projection-input-group">
                    <label htmlFor="genre" className="font-lg-semibold">Genre</label>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faLocationPin} className={`input-icon ${formData?.city ? "red-icon" : ""}`} />
                        <Select<SelectOptionType>
                            options={cityOptions || []}
                            placeholder="Choose city"
                            className="dropdown-menu-input"
                            classNamePrefix="dropdown"
                            isClearable={true}
                            value={formData.city}
                            onChange={(newValue) => handleChange("city", newValue)}
                        />
                    </div>
                </div>
                <div className="add-projection-input-group">
                    <label htmlFor="city" className="font-lg-semibold">City</label>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faBuilding} className={`input-icon ${formData?.venue ? "red-icon" : ""}`} />
                        <Select<SelectOptionType>
                            options={venueOptions}
                            placeholder="Choose venue"
                            className="dropdown-menu-input"
                            classNamePrefix="dropdown"
                            isClearable={true}
                            value={formData.venue}
                            onChange={(newValue) => handleChange("venue", newValue)}
                        />
                    </div>
                </div>
                <div className="add-projection-input-group">
                    <label htmlFor="time" className="font-lg-semibold">Projection Time</label>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faClock} className={`input-icon ${formData?.time ? "red-icon" : ""}`} />
                        <Select<SelectOptionType, false>
                            options={timeOptions}
                            placeholder="Choose time"
                            className="dropdown-menu-input"
                            classNamePrefix="dropdown"
                            isClearable
                            value={timeOptions.find(option => option.value === formData.time)}
                            onChange={(newValue) => handleChange("time", newValue?.value)}
                        />
                    </div>
                </div>
                <button className="projection-form-trash-btn">
                    <FontAwesomeIcon icon={faTrash} height={24} />
                </button>
            </div>
            <button className="projection-form-add-btn">
                <FontAwesomeIcon icon={faPlus} height={24} />
                <span className="font-lg-underline-semibold">Add Projection</span>
            </button>
        </form>
    )
}