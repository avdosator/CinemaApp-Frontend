import "./VenueForm.css";
import { faBuilding, faHashtag, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { AddVenueFormData } from "../../../../types/FormData";
import { SelectOptionType } from "../../../../types/SelectOptionType";
import ApiService from "../../../../service/ApiService";
import { City } from "../../../../types/City";
import { Venue } from "../../../../types/Venue";
import { useLocation, useNavigate } from "react-router-dom";
import { initializeVenueFormData } from "../../../../utils/utils";
import TertiaryButton from "../../../shared-components/buttons/TertiaryButton";
import placeholderImage from "../../../../assets/upload-photo-placeholder.jpg";

type VenueFormProps = {
    mode: "add" | "edit" | "view";
}

export default function VenueForm({ mode }: VenueFormProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const venueFromState: Venue | null = location.state?.venue || null;
    const [cityOptions, setCityOptions] = useState<SelectOptionType[]>([]);
    const [formData, setFormData] = useState<AddVenueFormData>(initializeVenueFormData(mode, venueFromState));
    const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ApiService.get<City[]>("/cities")
            .then(response => setCityOptions(response.map(city => ({ value: city.id, label: city.name }))))
            .catch(error => console.log(error));
    }, []);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedPhoto(file);
        }
    };

    const handleUploadPhotoBtnClick = () => {
        fileInputRef.current?.click();
    };

    const imgSrc =
        uploadedPhoto
            ? URL.createObjectURL(uploadedPhoto)
            : mode === "view" || mode === "edit"
                ? venueFromState?.photo?.url || placeholderImage
                : placeholderImage;

    const heading = mode === "add" ? "New Venue" : venueFromState?.name;

    const handleChange = (name: keyof AddVenueFormData, value: string | SelectOptionType) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const renderHeadingButton = (): JSX.Element | null => {
        return mode === "view" ? (
            <button
                className="add-movie-btn font-lg-semibold"
                onClick={() => navigate(`/admin/venues/${venueFromState?.id}/edit`, { state: { venue: venueFromState } })}
            >
                Edit Venue
            </button>
        ) : mode === "edit" ? (
            <TertiaryButton label="Delete Venue" size="large" />
        ) : null;
    }

    const renderControlButtons = (): JSX.Element | null => {
        return mode === "add" ? (
            <>
                <button className="venue-form-cancel-btn font-lg-semibold">Cancel</button>
                <button className="add-movie-btn font-lg-semibold">Add Venue</button>
            </>
        ) : mode === "edit" ? (
            <>
                <button className="venue-form-cancel-btn font-lg-semibold">Cancel</button>
                <button className="add-movie-btn font-lg-semibold">Save Changes</button>
            </>
        ) : null;
    }

    return (
        <div className="new-venue-container">
            <div className="venues-panel-heading" style={{ marginBottom: "0px" }}>
                <h6 className="font-heading-h6" style={{ color: "#1D2939", marginBottom: "8px" }}>{heading}</h6>
                {renderHeadingButton()}
            </div>
            <div className="full-width-horizontal-line" style={{ marginTop: "16px" }}></div>
            <form className="new-venue-form">
                <div className="uploaded-photo-preview-item">
                    <img src={imgSrc} className="uploaded-photo-thumbnail" />
                    {mode !== "view" && (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handlePhotoUpload}
                            />
                            <div className="upload-photo-btn-container">
                                <TertiaryButton
                                    label="Upload Photo"
                                    size="large"
                                    color="#FCFCFD"
                                    onClick={handleUploadPhotoBtnClick}
                                />
                            </div>
                        </>
                    )}
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
                                readOnly={mode === "view"}
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
                                readOnly={mode === "view"}
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
                                readOnly={mode === "view"}
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
                                readOnly={mode === "view"}
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
                            isDisabled={mode === "view"}
                        />
                    </div>
                </div>

            </form>
            <div className="full-width-horizontal-line"></div>
            <div className="venue-form-control-btn-group">
                {renderControlButtons()}
            </div>
        </div>
    );
}
