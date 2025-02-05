import { useState } from "react";
import "./UserActions.css"
import { useUser } from "../../../context/UserContext";
import ApiService from "../../../service/ApiService";
import { useNavigate } from "react-router-dom";

export default function UserActions({ name }: { name: string }) {
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
    const { currentUser, setCurrentUser } = useUser();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev);
    };

    const handleLogout = () => {
        const refreshToken = localStorage.getItem("refreshToken");
        const userId = localStorage.getItem("userId");
        if (refreshToken) {
            ApiService.post<String>("/auth/logout", { refreshToken, userId })
                .then(response => console.log(response)) // do we need to do anything with response
                .catch(error => console.error(error));
        }
        setCurrentUser(null);
        localStorage.clear();
        navigate("/home");
    };

    const goToAdminPage = () => {
        toggleDropdown();
        navigate("/admin");
    }

    const goToProfilePage = () => {
        toggleDropdown();
        navigate("/user");
    }

    return (
        <div className="navbar-actions">
            <div className="notification-btn">
                <a href="#" className="notification-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" className="notification-icon" fill="#FCFCFD" width="18" height="19" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" /></svg>
                </a>
                <span className="notification-dot"></span>
            </div>
            <button className="user-btn" onClick={toggleDropdown}>
                <span className="font-lg-semibold user-name">{name}</span>
                <div className="dropdown-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-icon" fill="#FCFCFD" width="14" height="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                </div>
            </button>
            {isDropdownVisible && (
                <div className="user-actions-dropdown-menu">
                    {currentUser && currentUser.role === "ROLE_ADMIN" && (
                        <button className="dropdown-item font-lg-regular" style={{ color: "#101828" }} onClick={goToAdminPage}>Admin</button>
                    )}
                    <button className="dropdown-item font-lg-regular" style={{ color: "#101828" }} onClick={goToProfilePage}>Profile</button>
                    <button className="dropdown-item font-lg-regular" onClick={handleLogout}>Log Out</button>
                </div>
            )}
        </div>
    )
}