import "./EditProfile.css"
import { useUser } from "../../../context/UserContext";
import TertiaryButton from "../../shared-components/buttons/TertiaryButton";
import placeholderImage from "./../../../assets/upload-photo-placeholder.jpg"
import { faEarthEurope, faEnvelope, faLocationPin, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select, { SingleValue } from "react-select";
import { SelectOptionType } from "../../../types/SelectOptionType";
import { useEffect, useState } from "react";
import { EditProfileFormData } from "../../../types/FormData";
import { City } from "../../../types/City";
import ApiService from "../../../service/ApiService";

export default function EditProfile() {
    const { currentUser } = useUser();
    const [cityOptions, setCityOptions] = useState<SelectOptionType[]>();
    const [countryOptions] = useState<SelectOptionType[]>([{ value: "BiH", label: "Bosnia & Herzegovina" }]);
    const [formData, setFormData] = useState<EditProfileFormData>({
        firstName: currentUser?.firstName ? currentUser.firstName : "",
        lastName: currentUser?.lastName ? currentUser.lastName : "",
        phone: currentUser?.phone ? currentUser.phone : "",
        email: currentUser?.email ? currentUser.email : "",
        city: currentUser?.city ? {value: currentUser.city.id, label: currentUser.city.name} : null,
        country: currentUser?.city ? {value: currentUser.city.country, label: currentUser.city.country} : null
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
    }, [])

    const handleChange = (name: keyof EditProfileFormData, value: string | SingleValue<SelectOptionType>) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="personal-information">
            <h6 className="font-heading-h6" style={{ color: "#1D2939", marginBottom: "10px" }}>Personal Information</h6>
            <div className="edit-profile-container">
                <div className="uploaded-photo-preview-item">
                    <img
                        src={currentUser?.photo ? currentUser.photo.url : placeholderImage}
                        className="uploaded-photo-thumbnail"
                    />
                    <div className="upload-photo-btn-container">
                        <TertiaryButton label="Upload Photo" size="large" color="#FCFCFD" />
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
                                        name="genre"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}