import "./SessionExpiredAlert.css"
import logoNavbar from "../../../assets/logo-navbar.png"
import { Link } from "react-router-dom";

type SessionExpiredAlertProps = {
    openLoginForm: () => void
}

export default function SessionExpiredAlert({ openLoginForm }: SessionExpiredAlertProps) {
    return (
        <div className="session-expired-alert">
            <div className="logo">
                <img src={logoNavbar} className="logo-img" alt="" />
            </div>
            <p className="font-lg-semibold" style={{ color: "#FCFCFC", margin: "0" }}>You need to be logged in for this content.</p>
            <button className="auth-form-btn" onClick={openLoginForm} style={{width: "30%", marginTop: "0px"}}>Log In</button>
            <Link className="font-lg-underline-semibold no-style-link close-auth-container-btn" to="/home">
                Return to Home page
            </Link>
        </div>
    )
}