import "./AuthContainer.css"
import logoNavbar from "../../assets/logo-navbar.png"
import SignInForm from "./sign-in/SignInForm"
import SignUpForm from "./sign-up/SignUpForm"
import { useState } from "react";
import PasswordResetContainer from "./password-reset/PasswordResetContainer";

export default function AuthContainer({ closeAuthContainer }: { closeAuthContainer: () => void }) {
    const [isSignIn, setIsSignIn] = useState<boolean>(true); // true = SignInForm, false = SignUpForm

    const switchToSignUpForm = (): void => {
        setIsSignIn(!isSignIn); // Toggle between forms
    };

    return (
        <div className="auth-container">
            <div className="logo">
                <img src={logoNavbar} className="logo-img" alt="" />
            </div>
            {/* {isSignIn ? (
                <SignInForm closeAuthContainer={closeAuthContainer} switchToSignUpForm={switchToSignUpForm} />
            ) : (
                <SignUpForm closeAuthContainer={closeAuthContainer} />
            )} */}
            <PasswordResetContainer />
            {/* Don't show this element if passwordReset is rendered */}
            <button onClick={closeAuthContainer} className="font-lg-underline-semibold no-style-link close-auth-container-btn" >
                Continue without signing In
            </button>
        </div>
    )
}