import "./SignUpForm.css"
import { Link } from "react-router-dom";

export default function SignUpForm() {
    return (
        <div className="sign-up-form-container">
            <div className="auth-container-heading">
                <div className="auth-back-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#D0D5DD" width="18" height="24" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                </div>
                <h5 className="font-heading-h5 auth-heading">Hellffdddfhfo</h5>
            </div>
            <form action="" className="sign-up-form">
                <div id="sign-up-email-container" className="sign-up-input-group">
                    <label htmlFor="" className="sign-up-form-label font-lg-semibold">Email</label>
                    <input type="text" className="font-lg-regular" />
                </div>
                <div id="sign-up-password-container" className="sign-up-input-group">
                    <label htmlFor="" className="sign-up-form-label font-lg-semibold">Password</label>
                    <input type="text" name="" id="" className="font-lg-regular" />
                </div>
                <div id="sign-up-confirm-password-container" className="sign-up-input-group">
                    <label htmlFor="" className="sign-up-form-label font-lg-semibold">Confirm Password</label>
                    <input type="text" name="" id="" className="font-lg-regular" />
                </div>
                <div className="sign-up-form-options">
                    <div>
                        <input type="checkbox" name="remember-me" id="remember-me" />
                        <label htmlFor="remember-me" className="font-lg-semibold " style={{ color: "#98A2B3" }}>Remember me</label>

                    </div>
                    <Link to="forgot-password-btn" className="no-style-link font-lg-semibold forgot-password-link">Forgot password?</Link>
                </div>
                <button type="submit" className="sign-up-form-btn font-lg-semibold">Sign Up</button>
            </form>
        </div>
    )
}