import "./AuthContainer.css"
import logoNavbar from "../../assets/logo-navbar.png"
import { Link } from "react-router-dom"
import SignUpForm from "./sign-up/SignUpForm"

export default function AuthContainer() {
    return (
        <div className="auth-container">
            <div className="logo">
                <img src={logoNavbar} className="logo-img" alt="" />
            </div>
            <SignUpForm />
            <div className="font-lg-regular" style={{ color: "#FCFCFD" }}>
                <span>Don't have an account yet?</span>
                <Link to="#" className="signup-redirect-btn font-lg-regular no-style-link">Sign up</Link>
            </div>
            <div>Or</div>
            <div className="other-login-ways">
                <div className="google-login-btn"></div>
                <div className="mac-login-btn"></div>
            </div>
            <Link to="#" className="font-lg-underline-semibold no-style-link" style={{ color: "#FCFCFD" }}>Continue without signing In</Link>
        </div>
    )
}