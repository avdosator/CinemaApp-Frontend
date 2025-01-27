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
import axios from "axios";
import AddMoviePopUp from "../../new-movie/pop-up/AddMoviePopUp";

type VenueFormProps = {
    mode: "add" | "edit" | "view";
}

const UPLOADCARE_PUBLIC_KEY = import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY;

export default function VenueForm({ mode }: VenueFormProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const venueFromState: Venue | null = location.state?.venue || null;
    const [cityOptions, setCityOptions] = useState<SelectOptionType[]>([]);
    const [formData, setFormData] = useState<AddVenueFormData>(initializeVenueFormData(mode, venueFromState));
    const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formNotFilledModal, setFormNotFilledModal] = useState<boolean>(false);

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

    const isFormValid = (): boolean => {
        const { name, phone, street, streetNumber, city } = formData;

        // Check for all required fields
        const isFormComplete =
            name &&
            phone &&
            street &&
            streetNumber &&
            city &&
            (mode === "add" ? uploadedPhoto : true); // Only require uploadedPhoto in "add" mode

        return Boolean(isFormComplete); // Convert to boolean
    };

    const uploadPhoto = async (): Promise<string> => {
        const formData = new FormData();
        formData.append("file", uploadedPhoto!);
        formData.append("UPLOADCARE_PUB_KEY", UPLOADCARE_PUBLIC_KEY);

        try {
            const response = await axios.post("https://upload.uploadcare.com/base/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return `https://ucarecdn.com/${response.data.file}/`;
        } catch (error) {
            console.error(`Error uploading file ${uploadedPhoto!.name}:`, error);
            throw error;
        }
    };

    const createVenue = () => {
        if (!isFormValid()) {
            setFormNotFilledModal(true); // Show modal if form is incomplete
            return; // Stop execution
        }

        const jwt = localStorage.getItem("authToken");
        const headers = { "Authorization": `Bearer ${jwt}` };

        try {
            uploadPhoto()
                .then(response => {
                    setFormData((prevData) => ({
                        ...prevData,
                        photoUrl: response
                    }));
                });

            const requestBody = { ...formData, city: formData.city.value };
            ApiService.post<Venue>("/venues", requestBody, headers)
                .then(() => {
                    console.log("Venue deleted!");
                    navigate("/admin/venues");
                });
        } catch (error) {
            console.error("Error creating venue: ", error);
        }
    }

    const updateVenue = async () => {
        if (!isFormValid()) {
            setFormNotFilledModal(true); // Show modal if form is incomplete
            return; // Stop execution
        }

        const jwt = localStorage.getItem("authToken");
        const headers = { "Authorization": `Bearer ${jwt}` };

        try {
            const photoUrl = uploadedPhoto
                ? await uploadPhoto() // Upload new photo if the user changes it
                : venueFromState?.photo?.url; // Use existing photo if no new one is uploaded

            // create object only from changed/updated fields
            const updatedVenueData = {
                ...(formData.name && { name: formData.name }),
                ...(formData.phone && { phone: formData.phone }),
                ...(formData.street && { street: formData.street }),
                ...(formData.streetNumber && { streetNumber: formData.streetNumber }),
                ...(formData.city && { city: formData.city.value }),
                ...(photoUrl && { photoUrl }),
            };

            await ApiService.patch(`/venues/${venueFromState?.id}`, updatedVenueData, headers); // Send PATCH request
            console.log("Venue updated successfully:", updatedVenueData);
            navigate("/admin/venues"); // Redirect after successful update

        } catch (error) {
            console.error("Error updating venue: ", error);
        }
        // create body with edited data
        // send request and update venue instance
    }

    const deleteVenue = () => {

        const jwt = localStorage.getItem("authToken");
        const headers = { "Authorization": `Bearer ${jwt}` };

        try {
            ApiService.delete(`/venues/${venueFromState?.id}`, headers)
                .then(() => {
                    console.log("Venue deleted!");
                    navigate("/admin/venues");
                });
        } catch (error) {
            console.error("Problem with deleting ", error);
        }
    }

    const renderControlButtons = (): JSX.Element | null => {
        return mode === "add" ? (
            <>
                <button className="venue-form-cancel-btn font-lg-semibold" onClick={() => navigate("/admin/venues")}>Cancel</button>
                <button className="add-movie-btn font-lg-semibold" onClick={createVenue}>Add Venue</button>
            </>
        ) : mode === "edit" ? (
            <>
                <button className="venue-form-cancel-btn font-lg-semibold">Cancel</button>
                <button className="add-movie-btn font-lg-semibold" onClick={updateVenue}>Save Changes</button>
            </>
        ) : null;
    }

    const renderHeadingButton = (): JSX.Element | null => {
        return mode === "view" ? (
            <button
                className="add-movie-btn font-lg-semibold"
                onClick={() => navigate(`/admin/venues/${venueFromState?.id}/edit`, { state: { venue: venueFromState } })}
            >
                Edit Venue
            </button>
        ) : mode === "edit" ? (
            <TertiaryButton label="Delete Venue" size="large" onClick={() => deleteVenue} />
        ) : null;
    }

    return (
        <div className="new-venue-container">
            {formNotFilledModal && (
                <AddMoviePopUp heading="Form Not Completed" text="Please complete all required fields before proceeding."
                    okayAction={setFormNotFilledModal}
                />
            )}
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
                            <FontAwesomeIcon icon={faBuilding} className={`input-icon ${formData?.name ? "red-icon" : ""}`} />
                            <input type="text"
                                name="venue"
                                id="venue"
                                className="search-movies-input font-lg-regular"
                                placeholder="Venue"
                                autoFocus
                                value={formData.name}
                                onChange={e => handleChange("name", e.target.value)}
                                readOnly={mode === "view"}
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="phone" className="font-lg-semibold">Phone</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faPhone} className={`input-icon ${formData?.phone ? "red-icon" : ""}`} />
                            <input type="text"
                                name="phone"
                                id="phone"
                                className="search-movies-input font-lg-regular"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={e => handleChange("phone", e.target.value)}
                                readOnly={mode === "view"}
                            />
                        </div>
                    </div>
                </div>
                <div className="new-venue-group">
                    <div className="general-form-input-group">
                        <label htmlFor="street" className="font-lg-semibold">Street</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faLocationPin} className={`input-icon ${formData?.street ? "red-icon" : ""}`} />
                            <input type="text"
                                name="street"
                                id="street"
                                className="search-movies-input font-lg-regular"
                                placeholder="Street"
                                value={formData.street}
                                onChange={e => handleChange("street", e.target.value)}
                                readOnly={mode === "view"}
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="streetNumber" className="font-lg-semibold">Street Number</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faHashtag} className={`input-icon ${formData?.streetNumber ? "red-icon" : ""}`} />
                            <input type="text"
                                name="streetNumber"
                                id="streetNumber"
                                className="search-movies-input font-lg-regular"
                                placeholder="Number"
                                value={formData.streetNumber}
                                onChange={e => handleChange("streetNumber", e.target.value)}
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
                            isSearchable={false}
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
