import PasswordResetEmail from "./PasswordResetEmail";
import "../AuthForm.css"
import PasswordResetCode from "./PasswordResetCode";

export default function PasswordResetContainer() {
    return (
        <div className="auth-form-container">
            <div className="auth-container-heading">
                <button className="auth-back-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#D0D5DD" width="18" height="24" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                </button>
                <h5 className="font-heading-h5 auth-heading">Password Reset</h5>
            </div>
                {/* <PasswordResetEmail /> */}
                <PasswordResetCode />
        </div>
    )
}