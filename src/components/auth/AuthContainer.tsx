import "./AuthContainer.css"
import logoNavbar from "../../assets/logo-navbar.png"
import { Link } from "react-router-dom"
import SignInForm from "./sign-in/SignInForm"

export default function AuthContainer({ closeAuthContainer }: { closeAuthContainer: () => void }) {
    return (
        <div className="auth-container">
            <div className="logo">
                <img src={logoNavbar} className="logo-img" alt="" />
            </div>
            {/* <SignUpForm closeAuthContainer={closeAuthContainer} /> */}
            <SignInForm closeAuthContainer={closeAuthContainer} />
            <div className="font-lg-regular" style={{ color: "#FCFCFD" }}>
                <span>Don't have an account yet?</span>
                <Link to="#" className="signup-redirect-btn font-lg-regular font-lg-underline-semibold no-style-link">Sign up</Link>
            </div>
            <div className="font-lg-regular" id="or-divider" style={{ color: "#FCFCFD" }}>
                <span className="auth-horizontal-line"></span>
                <span>Or</span>
                <span className="auth-horizontal-line"></span>
            </div>
            <div className="other-login-ways">
                <div className="google-login-btn"></div>
                <div className="mac-login-btn"></div>
            </div>
            <button onClick={closeAuthContainer} className="font-lg-underline-semibold no-style-link close-auth-container-btn" >
                Continue without signing In
            </button>
        </div>
    )
}