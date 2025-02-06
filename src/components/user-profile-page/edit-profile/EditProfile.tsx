import "./EditProfile.css"
import { useUser } from "../../../context/UserContext";
import TertiaryButton from "../../shared-components/buttons/TertiaryButton";
import placeholderImage from "./../../../assets/upload-photo-placeholder.jpg"
import { faEarthEurope, faEnvelope, faLocationPin, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select, { SingleValue } from "react-select";
import { SelectOptionType } from "../../../types/SelectOptionType";
import { useEffect, useRef, useState } from "react";
import { EditProfileFormData } from "../../../types/FormData";
import { City } from "../../../types/City";
import ApiService from "../../../service/ApiService";
import EditProfileControlButtonGroup from "./edit-profile-control-button-group/EditProfileControlButtonGroup";
import axios from "axios";

const UPLOADCARE_PUBLIC_KEY = import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY;

export default function EditProfile() {
    const { currentUser } = useUser();
    const [cityOptions, setCityOptions] = useState<SelectOptionType[]>();
    const [countryOptions] = useState<SelectOptionType[]>([{ value: "BiH", label: "Bosnia & Herzegovina" }]);
    const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newPhotoUrl, setNewPhotoUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState<EditProfileFormData>({
        firstName: currentUser?.firstName ? currentUser.firstName : "",
        lastName: currentUser?.lastName ? currentUser.lastName : "",
        phone: currentUser?.phone ? currentUser.phone : "",
        email: currentUser?.email ? currentUser.email : "",
        city: currentUser?.city ? { value: currentUser.city.id, label: currentUser.city.name } : null,
        country: currentUser?.city ? { value: currentUser.city.country, label: currentUser.city.country } : null
    });

    useEffect(() => {
        try {
            ApiService.get<City[]>("/cities")
                .then(cities => {
                    const cityOptions = cities.map(city => ({ value: city.id, label: city.name }));
                    setCityOptions(cityOptions);
                });
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedPhoto(file);
        }
    };

    const handleChange = (name: keyof EditProfileFormData, value: string | SingleValue<SelectOptionType>) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const uploadPhoto = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("UPLOADCARE_PUB_KEY", UPLOADCARE_PUBLIC_KEY);

        try {
            const response = await axios.post("https://upload.uploadcare.com/base/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return `https://ucarecdn.com/${response.data.file}/`;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    };

    const handleUpdateProfile = async () => {
        let photoUrlToSend = currentUser?.photo?.url || null;

        // If a new photo is selected, upload it first
        if (uploadedPhoto) {
            try {
                photoUrlToSend = await uploadPhoto(uploadedPhoto);
            } catch (error) {
                console.error("Photo upload failed:", error);
                alert("Failed to upload photo. Please try again.");
                return;
            }
        }

        const requestData: any = {
            userId: currentUser?.id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            cityId: formData.city?.value || null
        };

        // Include `photoUrl` only if it changed
        if (photoUrlToSend !== currentUser?.photo?.url) {
            requestData.photoUrl = photoUrlToSend;
        }

        const jwt = localStorage.getItem("authToken");
        const headers = { "Authorization": `Bearer ${jwt}` };

        try {
            await ApiService.patch("/users/update-profile", requestData, headers);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };


    return (
        <div className="personal-information">
            <h6 className="font-heading-h6" style={{ color: "#1D2939", marginBottom: "10px" }}>Personal Information</h6>
            <div className="edit-profile-container">
                <div className="uploaded-photo-preview-item">
                    <img
                        src={uploadedPhoto ? URL.createObjectURL(uploadedPhoto) : currentUser?.photo ? currentUser.photo.url : placeholderImage}
                        className="uploaded-photo-thumbnail"
                    />
                    <div className="upload-photo-btn-container" onClick={() => fileInputRef.current?.click()}>
                        <TertiaryButton label="Upload Photo" size="large" color="#FCFCFD" />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handlePhotoUpload}
                        />
                    </div>
                </div>
                <div className="full-width-horizontal-line"></div>
                <form className="edit-profile-form">
                    <div className="half-width-elements">
                        <div className="left-part">
                            <div className="general-form-input-group">
                                <label htmlFor="firstName" className="font-lg-semibold">First Name</label>
                                <div className="input-wrapper">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`input-icon ${formData?.firstName ? "red-icon" : ""}`} />
                                    <input type="text"
                                        name="firstName"
                                        id="firstName"
                                        className="search-movies-input font-lg-regular"
                                        placeholder="First Name"
                                        autoFocus
                                        value={formData.firstName}
                                        onChange={e => handleChange("firstName", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="general-form-input-group">
                                <label htmlFor="phone" className="font-lg-semibold">Phone</label>
                                <div className="input-wrapper">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`input-icon ${formData?.phone ? "red-icon" : ""}`} />
                                    <input type="text"
                                        name="phone"
                                        id="phone"
                                        className="search-movies-input font-lg-regular"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={e => handleChange("phone", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="general-form-input-group">
                                <label htmlFor="city" className="font-lg-semibold">City</label>
                                <div className="input-wrapper">
                                    <FontAwesomeIcon icon={faLocationPin} className={`input-icon ${formData?.city ? "red-icon" : ""}`} />
                                    <Select<SelectOptionType, false>
                                        options={cityOptions}
                                        placeholder="Choose city"
                                        className="dropdown-menu-input"
                                        classNamePrefix="dropdown"
                                        isClearable={true}
                                        value={formData.city}
                                        onChange={(newValue) => handleChange("city", newValue)}
                                        name="city"
                                        backspaceRemovesValue
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="right-part">
                            <div className="general-form-input-group">
                                <label htmlFor="lastName" className="font-lg-semibold">Last Name</label>
                                <div className="input-wrapper">
                                    <FontAwesomeIcon icon={faLocationPin} className={`input-icon ${formData?.lastName ? "red-icon" : ""}`} />
                                    <input type="text"
                                        name="lastName"
                                        id="lastName"
                                        className="search-movies-input font-lg-regular"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={e => handleChange("lastName", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="general-form-input-group">
                                <label htmlFor="email" className="font-lg-semibold">Email</label>
                                <div className="input-wrapper">
                                    <FontAwesomeIcon icon={faEnvelope} className={`input-icon ${formData?.email ? "red-icon" : ""}`} />
                                    <input type="text"
                                        name="email"
                                        id="email"
                                        className="search-movies-input font-lg-regular"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={e => handleChange("email", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="general-form-input-group">
                                <label htmlFor="country" className="font-lg-semibold">Country</label>
                                <div className="input-wrapper">
                                    <FontAwesomeIcon icon={faEarthEurope} className={`input-icon ${formData?.country ? "red-icon" : ""}`} />
                                    <Select<SelectOptionType, false>
                                        options={countryOptions}
                                        placeholder="Select Country"
                                        className="dropdown-menu-input"
                                        classNamePrefix="dropdown"
                                        isClearable={true}
                                        value={formData.country}
                                        onChange={(newValue) => handleChange("country", newValue)}
                                        name="country"
                                        backspaceRemovesValue
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="full-width-horizontal-line"></div>
                <EditProfileControlButtonGroup handleUpdateProfile={handleUpdateProfile} />
            </div>
        </div>
    );
}