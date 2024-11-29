export const authStepHeadings: Record<"signIn" | "signUp" | "passwordResetEmail" | "passwordResetCode" | "newPassword", string> = {
    signIn: "Welcome Back",
    signUp: "Hello",
    passwordResetEmail: "Reset Password",
    passwordResetCode: "Reset Password",
    newPassword: "Reset Password"
};

// action for back button in AuthContainer / AuthHeading
export const backActions = (
    closeAuthContainer: () => void,
    setAuthStep: (step: "signIn" | "signUp" | "passwordResetEmail" | "passwordResetCode" | "newPassword") => void
): Record<"signIn" | "signUp" | "passwordResetEmail" | "passwordResetCode" | "newPassword", () => void> => ({
    signIn: closeAuthContainer,
    signUp: () => setAuthStep("signIn"),
    passwordResetEmail: () => setAuthStep("signIn"),
    passwordResetCode: () => setAuthStep("passwordResetEmail"),
    newPassword: () => setAuthStep("passwordResetCode")
});