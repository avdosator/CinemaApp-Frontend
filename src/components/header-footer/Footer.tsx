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
                    <a href="#">ABOUT US</a>
                    <div className="divider"></div>
                    <a href="#">TICKETS</a>
                </div>
                <div className="footer-copyright">
                    <p>Copyright ©Cinebh. Built with love in Sarajevo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}