import { NavLink } from "react-router-dom"
import logoFooter from "../../assets/logo-footer.png"
import "./Footer.css"

export default function Footer() {
    return(
        <footer className="footer">
            <div className="footer-content">
                <div className="logo">
                    <img src={logoFooter} alt="" />
                </div>
                <div className="footer-links font-heading-caption">
                    <NavLink to="/about">ABOUT US</NavLink>
                    <div className="divider"></div>
                    <NavLink to="/pricing">TICKETS</NavLink>
                </div>
                <div className="footer-copyright">
                    <p className="font-md-regular">Copyright ©Cinebh. Built with love in Sarajevo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}