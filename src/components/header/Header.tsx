import { NavLink } from "react-router-dom"
import logoNavbar from "../../assets/logo-navbar.png"
import "./Header.css"
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import UserActions from "./user-actions/UserActions";

type HeaderProps = {
    openAuthModal: (path?: string, state?: any) => void,
    width: string
}

export default function Header({ openAuthModal, width }: HeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { currentUser } = useUser();
    let name: string = currentUser?.email.split("@")[0] || "";

    const handleToggle = (): void => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content" style={{ width: width }}>
                <NavLink to="/home" >
                    <div className="logo">
                        <img src={logoNavbar} alt="" />
                    </div>
                </NavLink>
                <button className="navbar-toggler" onClick={handleToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
                </button>
                <div className="navbar-links">
                    <NavLink
                        to="/movies/currently-showing"
                        className={({ isActive }) => `navbar-link-item font-lg-regular ${isActive ? "active-link font-lg-underline-semibold" : ""}`}>
                        Currently Showing
                    </NavLink>
                    <NavLink
                        to="/movies/upcoming"
                        className={({ isActive }) => `navbar-link-item font-lg-regular ${isActive ? "active-link font-lg-underline-semibold" : ""}`}>
                        Upcoming Movies
                    </NavLink>
                    <NavLink
                        to="/venues"
                        className={({ isActive }) => `navbar-link-item font-lg-regular ${isActive ? "active-link font-lg-underline-semibold" : ""}`}>
                        Venues
                    </NavLink>
                </div>
                {currentUser ?
                    (<UserActions name={name} />)
                    :
                    (<button onClick={() => openAuthModal()} className="navbar-sign-in-btn font-lg-semibold">
                        Sign In
                    </button>)
                }
            </div>
            {isDropdownOpen && (
                <div className="dropdown-links">
                    <NavLink to="/currently-showing" className="dropdown-link-item">Currently Showing</NavLink>
                    <NavLink to="/upcoming-movies" className="dropdown-link-item">Upcoming Movies</NavLink>
                    <NavLink to="#" className="dropdown-link-item">Venues</NavLink>
                </div>
            )}
        </nav>
    )
}
