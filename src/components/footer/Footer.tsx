import { NavLink } from "react-router-dom"
import CinebhLogo from "../shared-components/logo/CinebhLogo"
import "./Footer.css"

export default function Footer() {
    return(
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <CinebhLogo isRed={false}/>
                </div>
                <div className="footer-links">
                    <NavLink to="/about">ABOUT US</NavLink>
                    <div className="divider"></div>
                    <NavLink to="/pricing">TICKETS</NavLink>
                </div>
                <div className="footer-copyright">
                    <p>Copyright ©Cinebh. Built with love in Sarajevo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}