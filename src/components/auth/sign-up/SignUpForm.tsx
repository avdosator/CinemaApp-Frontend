import { Link } from "react-router-dom";

export default function SignUpForm() {
    return (
        <form action="" className="sign-up-form">
            <div id="signup-email-container">
                <label htmlFor=""></label>
                <input type="text" />
            </div>
            <div id="signup-password-container">
                <label htmlFor=""></label>
                <input type="text" name="" id="" />
            </div>
            <div id="signup-confirm-password-container">
                <label htmlFor=""></label>
                <input type="text" name="" id="" />
            </div>
            <div>
                <input type="checkbox" name="remember-me" id="remember-me" />
                <Link to="forgot-password-btn">Forgot password?</Link>
            </div>
        </form>
    )
}