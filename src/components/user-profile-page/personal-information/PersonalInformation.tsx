import "./PersonalInformation.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../../../context/UserContext";
import { faEarthEurope, faEnvelope, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import placeHolderImage from "./../../../assets/upload-photo-placeholder.jpg"

export default function PersonalInformation() {
    const { currentUser } = useUser();

    return (
        <div className="personal-information">
            <div className="personal-information-heading-container">
                <h6 className="font-heading-h6" style={{ color: "#1D2939", marginBottom: "10px" }}>Personal Information</h6>
                <button className="add-movie-btn font-lg-semibold" style={{ alignSelf: "flex-start" }}>Edit Profile</button>
            </div>
            <div className="personal-information-card">
                <div>
                    <img src={currentUser?.photo ? currentUser.photo.url : placeHolderImage} className="user-profile-img" alt="" />
                </div>
                <div className="personal-informations-container">
                    <h4 className="font-heading-h4">{currentUser && currentUser.firstName && currentUser.lastName ? `${currentUser.firstName} ${currentUser.lastName}` : "First and Lastname"}</h4>
                    <div className="user-info-container font-lg-regular">
                        <FontAwesomeIcon width={16} height={24} color="#B22222" icon={faPhone} />
                        {currentUser && currentUser.phone ? currentUser.phone : "Telephone"}
                    </div>
                    <div className="user-info-container font-lg-regular">
                        <FontAwesomeIcon width={16} height={24} color="#B22222" icon={faEnvelope} />
                        {currentUser && currentUser.email ? currentUser.email : "Email"}
                    </div>
                    <div className="user-info-container font-lg-regular">
                        <FontAwesomeIcon width={16} height={24} color="#B22222" icon={faLocationPin} />
                        {currentUser && currentUser.city ? currentUser.city.name : "City"}
                    </div>
                    <div className="user-info-container font-lg-regular">
                        <FontAwesomeIcon width={16} height={24} color="#B22222" icon={faEarthEurope} />
                        {currentUser && currentUser.city ? currentUser.city.country : "Country"}

                    </div>
                </div>
            </div>

        </div>
    );
}