import { faBuilding, faHashtag, faLocation, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Select from "react-select";
import { AddVenueFormData } from "../../../../types/FormData";
import { SelectOptionType } from "../../../../types/SelectOptionType";
import ApiService from "../../../../service/ApiService";
import { City } from "../../../../types/City";

interface VenueFormProps {
    mode: 'add' | 'edit' | 'view';
    initialData?: {
        title: string;
        phone: string;
        street: string;
        streetNumber: string;
        city: string;
        photoUrl?: string;
    };
    onSubmit?: (data: any) => void;
    onCancel?: () => void;
}

export default function VenueForm({ initialData }: VenueFormProps) {
    const [cityOptions, setCityOptions] = useState<SelectOptionType[]>([]);
    const [formData, setFormData] = useState<AddVenueFormData>(initialData || {
        title: "",
        phone: "",
        street: "",
        streetNumber: "",
        city: "",
        photoUrl: "",
    });

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
            <h6 className="font-heading-h6" style={{ color: "#1D2939" }}>New Venue</h6>
            <div className="full-width-horizontal-line"></div>
            <form className="new-venue-form">
                <div>
                    <input type="file" />
                    <div></div>
                </div>

                <div>
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
                            />
                        </div>
                    </div>

                </div>


                <div>
                    <div className="general-form-input-group">
                        <label htmlFor="street" className="font-lg-semibold">Street</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faLocation} className={`input-icon ${formData?.title ? "red-icon" : ""}`} />
                            <input type="text"
                                name="street"
                                id="street"
                                className="search-movies-input font-lg-regular"
                                placeholder="Street"
                                value={formData.street}
                                onChange={e => handleChange("title", e.target.value)}
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
                            />
                        </div>
                    </div>

                </div>


                <div className="general-form-input-group">
                    <label htmlFor="genre" className="font-lg-semibold">Genre</label>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faLocation} className={`input-icon ${formData.city ? "red-icon" : ""}`} />
                        <Select<SelectOptionType, false>
                            options={cityOptions}
                            placeholder="Choose city"
                            className="dropdown-menu-input"
                            classNamePrefix="dropdown"
                            isClearable={true}
                            value={formData.city}
                            onChange={(newValue) => handleChange("city", newValue!)}
                            name="city"
                        />
                    </div>
                </div>

            </form>
        </div>
    );
}
