import "./AuthContainer.css"
import logoNavbar from "../../assets/logo-navbar.png"
import { Link } from "react-router-dom"
import SignUpForm from "./sign-up/SignUpForm"

export default function AuthContainer() {
    return (
        <div className="auth-container">
            <div className="logo-container">
                <img src={logoNavbar} alt="" />
            </div>
            <SignUpForm />
            <div className="font-lg-regular" style={{ color: "#FCFCFD" }}>
                <span>Don't have an account yet?</span>
                <Link to="#" className="signup-redirect-btn font-lg-regular">Sign up</Link>
            </div>
            <div>Or</div>
            <div className="other-login-ways">
                <div className="google-login-btn"></div>
                <div className="mac-login-btn"></div>
            </div>
            <Link to="#" className="font-lg-underline-semibo">Continue without signing In</Link>
        </div>
    )
}