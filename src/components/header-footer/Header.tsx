import { NavLink } from "react-router-dom"
import CinebhLogo from "../shared-components/logo/CinebhLogo"
import "./Header.css"

export default function Header() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="navbar-logo">
                        <NavLink to="/" className="logo-container">
                            <CinebhLogo isRed={true}/>
                        </NavLink>
                    </div>
                    <div className="navbar-links">
                        <NavLink to="/home" className="navbar-link-item" end>Currently Showing</NavLink>
                        <NavLink to="#" className="navbar-link-item">Upcoming Movies</NavLink>
                        <NavLink to="#" className="navbar-link-item">Venues</NavLink>
                    </div>
                    <div className="navbar-actions">
                        <div className="notification-btn">
                            <a href="#" className="notification-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" className="notification-icon" width="18" height="19" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" /></svg>
                            </a>
                            <span className="notification-dot"></span>
                        </div>
                        <div className="user-btn">
                            <span className="user-name">Jean Doe</span>
                            {/* Maybe this needs to be some dropdown */}
                            <a href="#" className="dropdown-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-icon" width="14" height="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}