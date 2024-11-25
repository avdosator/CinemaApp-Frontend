import "./AuthContainer.css"
import logoNavbar from "../../assets/logo-navbar.png"
import { Link } from "react-router-dom"

export default function AuthContainer() {
    return (
        <div className="auth-container">
            <div className="logo-container">
                <img src={logoNavbar} alt="" />
            </div>
            <div className="auth-container-heading">
                <div className="auth-back-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                </div>
                <h5 className="font-heading-h5 auth-heading">Hello</h5>
            </div>
            <div>LoginForm</div>
            <div className="font-lg-regular" style={{ color: "#FCFCFD" }}>
                <span>Don't have an account yet?</span>
                <Link to="#" className="signup-redirect-btn font-lg-regular">Sign up</Link>
            </div>
            <div>Or</div>
            <div className="other-login-ways">
                <div className="google-login-btn"></div>
                <div className="mac-login-btn"></div>
            </div>
            <Link to="#" className="font-lg-underline-semibold">Continue without signing In</Link>
        </div>
    )
}