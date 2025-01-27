import "./VenueForm.css";
import { faBuilding, faHashtag, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Select from "react-select";
import { AddVenueFormData } from "../../../../types/FormData";
import { SelectOptionType } from "../../../../types/SelectOptionType";
import ApiService from "../../../../service/ApiService";
import { City } from "../../../../types/City";
import { Venue } from "../../../../types/Venue";
import { useLocation } from "react-router-dom";
import { initializeVenueFormData } from "../../../../utils/utils";

type VenueFormProps = {
    mode: 'add' | 'edit' | 'view';
    onSubmit?: (data: any) => void;
    onCancel?: () => void;
}

export default function VenueForm({ mode }: VenueFormProps) {
    const location = useLocation();
    const venueFromState: Venue | null = location.state?.venue || null;
    const [cityOptions, setCityOptions] = useState<SelectOptionType[]>([]);
    const [formData, setFormData] = useState<AddVenueFormData>(initializeVenueFormData(mode, venueFromState));

    const heading = mode === "add" ? "New Venue" : venueFromState?.name;

    useEffect(() => {
        ApiService.get<City[]>("/cities")
            .then(response => setCityOptions(response.map(city => ({ value: city.id, label: city.name }))))
            .catch(error => console.log(error));
    }, []);

    const handleChange = (name: keyof AddVenueFormData, value: string | SelectOptionType) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="new-venue-container">
            <h6 className="font-heading-h6" style={{ color: "#1D2939", marginBottom: "8px" }}>{heading}</h6>
            <div className="full-width-horizontal-line"></div>
            <form className="new-venue-form">
                <div>
                    <input type="file" />
                    <div></div>
                </div>
                <div className="full-width-horizontal-line"></div>
                <div className="new-venue-group">
                    <div className="general-form-input-group">
                        <label htmlFor="venue" className="font-lg-semibold">Venue Name</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faBuilding} className={`input-icon ${formData?.title ? "red-icon" : ""}`} />
                            <input type="text"
                                name="venue"
                                id="venue"
                                className="search-movies-input font-lg-regular"
                                placeholder="Venue"
                                autoFocus
                                value={formData.title}
                                onChange={e => handleChange("title", e.target.value)}
                                readOnly={mode === 'view'}
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="phone" className="font-lg-semibold">Phone</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faPhone} className={`input-icon ${formData?.title ? "red-icon" : ""}`} />
                            <input type="text"
                                name="phone"
                                id="phone"
                                className="search-movies-input font-lg-regular"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={e => handleChange("title", e.target.value)}
                                readOnly={mode === 'view'}
                            />
                        </div>
                    </div>
                </div>


                <div className="new-venue-group">
                    <div className="general-form-input-group">
                        <label htmlFor="street" className="font-lg-semibold">Street</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faLocationPin} className={`input-icon ${formData?.title ? "red-icon" : ""}`} />
                            <input type="text"
                                name="street"
                                id="street"
                                className="search-movies-input font-lg-regular"
                                placeholder="Street"
                                value={formData.street}
                                onChange={e => handleChange("title", e.target.value)}
                                readOnly={mode === 'view'}
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="streetNumber" className="font-lg-semibold">Street Number</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faHashtag} className={`input-icon ${formData?.title ? "red-icon" : ""}`} />
                            <input type="text"
                                name="streetNumber"
                                id="streetNumber"
                                className="search-movies-input font-lg-regular"
                                placeholder="Number"
                                value={formData.streetNumber}
                                onChange={e => handleChange("title", e.target.value)}
                                readOnly={mode === 'view'}
                            />
                        </div>
                    </div>
                </div>


                <div className="general-form-input-group">
                    <label htmlFor="çity" className="font-lg-semibold">City</label>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faLocationPin} className={`input-icon ${formData.city ? "red-icon" : ""}`} />
                        <Select<SelectOptionType, false>
                            options={cityOptions}
                            placeholder="Choose city"
                            className="dropdown-menu-input"
                            classNamePrefix="dropdown"
                            isClearable={true}
                            value={formData.city}
                            onChange={(newValue) => handleChange("city", newValue!)}
                            name="city"
                        //readOnly={mode === 'view'}
                        />
                    </div>
                </div>

            </form>
            <div className="full-width-horizontal-line"></div>

        </div>
    );
}
