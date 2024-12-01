export const authStepHeadings: Record<
    "signIn" | "signUp" | "passwordResetEmail" | "passwordResetCode" | "newPassword" | "successfulSignIn" | "successfulSignUp" | "successfulPasswordChange",
    string> = {
    signIn: "Welcome Back",
    signUp: "Hello",
    passwordResetEmail: "Reset Password",
    passwordResetCode: "Reset Password",
    newPassword: "Reset Password",
    successfulSignIn: "Sign In Successful! 🎉",
    successfulSignUp: "You’re all set! 🎉",
    successfulPasswordChange: "Password Reset Successful! 🎉"
};

// action for back button in AuthContainer / AuthHeading
export const backActions = (
    closeAuthContainer: () => void,
    setAuthStep: (step: "signIn" | "signUp" | "passwordResetEmail" | "passwordResetCode" | "newPassword" | "successfulSignIn" | "successfulSignUp" | "successfulPasswordChange",) => void
): Record<"signIn" | "signUp" | "passwordResetEmail" | "passwordResetCode" | "newPassword" | "successfulSignIn" | "successfulSignUp" | "successfulPasswordChange", () => void> => ({
    signIn: closeAuthContainer,
    signUp: () => setAuthStep("signIn"),
    passwordResetEmail: () => setAuthStep("signIn"),
    passwordResetCode: () => setAuthStep("passwordResetEmail"),
    newPassword: () => setAuthStep("passwordResetCode"),
    successfulSignIn: closeAuthContainer,
    successfulSignUp: closeAuthContainer,
    successfulPasswordChange: closeAuthContainer,
});