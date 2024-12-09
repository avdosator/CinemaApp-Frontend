import "./AuthContainer.css"
import logoNavbar from "../../../assets/logo-navbar.png"
import SignInForm from "../sign-in/SignInForm"
import SignUpForm from "../sign-up/SignUpForm"
import { useState } from "react";
import PasswordResetEmail from "../password-reset/PasswordResetEmail";
import PasswordResetCode from "../password-reset/password-reset-code/PasswordResetCode";
import NewPasswordForm from "../password-reset/NewPasswordForm";
import AuthHeading from "../AuthHeading";
import { authStepHeadings, backActions } from "../authConfig";
import AuthSuccess from "../successful-action/AuthSuccess";
import { faVideo, faLock, faFilm } from "@fortawesome/free-solid-svg-icons";

type AuthContainerProps = {
    closeAuthContainer: () => void
}

export default function AuthContainer({ closeAuthContainer }: AuthContainerProps) {
    const [authStep, setAuthStep] = useState<"signIn" | "signUp" | "passwordResetEmail" | "passwordResetCode" | "newPassword" | "successfulSignIn" | "successfulSignUp" | "successfulPasswordChange">("signIn");
    const [resetCodeEmail, setResetCodeEmail] = useState<string>("");
    const [passwordResetEmailResponse, setPasswordResetEmailResponse] = useState<string>("");

    const backButtonActions = backActions(closeAuthContainer, setAuthStep);

    const handleEmailSubmit = (email: string, response: string) => {
        setResetCodeEmail(email); // Save the email
        setPasswordResetEmailResponse(response);
        setAuthStep("passwordResetCode"); // Move to the next step
    };

    const renderForm = () => {
        switch (authStep) {
            case "signIn":
                return (
                    <SignInForm
                        closeAuthContainer={closeAuthContainer}
                        switchToSignUpForm={() => setAuthStep("signUp")}
                        forgotPassword={() => setAuthStep("passwordResetEmail")}
                        success={() => setAuthStep("successfulSignIn")}
                    />
                );
            case "signUp":
                return (<SignUpForm success={() => setAuthStep("successfulSignUp")} />);
            case "passwordResetEmail":
                return (<PasswordResetEmail onValidEmail={handleEmailSubmit} />);
            case "passwordResetCode":
                return (
                    <PasswordResetCode email={resetCodeEmail} response={passwordResetEmailResponse} onCodeVerified={() => setAuthStep("newPassword")} />);
            case "newPassword":
                return (
                    <NewPasswordForm
                        email={resetCodeEmail}
                        success={() => setAuthStep("successfulPasswordChange")}
                        closeAuthContainer={closeAuthContainer}
                    />
                );
            case "successfulSignIn":
                return (<AuthSuccess text="Please, wait. You will be directed to the homepage." icon={faVideo} />);
            case "successfulSignUp":
                return (
                    <AuthSuccess
                        text="Start exploring latest movies, venues, and ticket options!"
                        icon={faFilm}
                        btn={true}
                        closeAuthContainer={closeAuthContainer}
                    />
                );
            case "successfulPasswordChange":
                return (<AuthSuccess text="Please, wait. You will be directed to the homepage." icon={faLock} />);
        }
    };

    return (
        <div className="auth-container">
            <div className="logo">
                <img src={logoNavbar} className="logo-img" alt="" />
            </div>
            <AuthHeading onBack={backButtonActions[authStep]} headingText={authStepHeadings[authStep]} />
            {renderForm()}
            {(authStep === "signIn" || authStep === "signUp") && (
                <button onClick={closeAuthContainer} className="font-lg-underline-semibold no-style-link close-auth-container-btn">
                    Continue without signing in
                </button>
            )}
        </div>
    )
}