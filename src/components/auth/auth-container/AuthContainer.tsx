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

export default function AuthContainer({ closeAuthContainer }: { closeAuthContainer: () => void }) {
    const [authStep, setAuthStep] = useState<"signIn" | "signUp" | "passwordResetEmail" | "passwordResetCode" | "newPassword">("signIn");
    const [resetCodeEmail, setResetCodeEmail] = useState<string>("");

    const backButtonActions = backActions(closeAuthContainer, setAuthStep);

    const handleEmailSubmit = (email: string) => {
        setResetCodeEmail(email); // Save the email
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
                    />
                );
            case "signUp":
                return (<SignUpForm />);
            case "passwordResetEmail":
                return (<PasswordResetEmail onValidEmail={handleEmailSubmit} />);
            case "passwordResetCode":
                return (
                    <PasswordResetCode email={resetCodeEmail} onCodeVerified={() => setAuthStep("newPassword")} />);
            case "newPassword":
                return (<NewPasswordForm email={resetCodeEmail} />);
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