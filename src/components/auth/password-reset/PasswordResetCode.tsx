export default function PasswordResetCode() {
    return (
        <div className="password-reset-code-container">
            <p className="font-md-regular password-reset-email-info">
                We have sent code to your email j******e@gmail.com. Please, enter the code below to verify.
            </p>
            <form>
                <div className="password-reset-code-inputs">
                    <input type="number" className="password-reset-code-input" />
                    <input type="number" className="password-reset-code-input" />
                    <input type="number" className="password-reset-code-input" />
                    <input type="number" className="password-reset-code-input" />
                </div>
                <p className="font-md-regular password-reset-email-info">
                    Didn't receive email?
                </p>
                <p className="font-md-regular password-reset-email-info">
                    You can resend email in 32 seconds.
                </p>
                <button type="submit" className="auth-form-btn font-lg-semibold">Continue</button>
            </form>
        </div>
    )
}