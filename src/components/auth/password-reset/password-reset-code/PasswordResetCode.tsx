import { useEffect, useRef, useState } from "react";
import "./PasswordResetCode.css"
import "../../AuthForm.css"
import ApiService from "../../../../service/ApiService";

type PasswordResetCodeProps = {
    email: string,
    response: string,
    onCodeVerified: () => void
}

export default function PasswordResetCode({ email, response, onCodeVerified }: PasswordResetCodeProps) {
    const [formData, setFormData] = useState<string[]>(["", "", "", ""]);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [resendTimer, setResendTimer] = useState<number>(120);
    const [resetCodeError, setResetCodeError] = useState<string | null>(null);

    // Start the timer on component mount
    useEffect(() => {
        const timer = setInterval(() => {
            setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer); // Cleanup timer on unmount
    }, []);

    // Focus the first input when the component loads
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleInputChange = (index: number, value: string): void => {
        if (/^\d?$/.test(value)) { // Allow only single digit or empty
            const newCode: string[] = [...formData];
            newCode[index] = value;
            setFormData(newCode);

            // Move focus to the next input if not empty
            if (value && index < formData.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    // Move focus to previous input with backspace
    const handleBackspace = (index: number): void => {
        if (index > 0 && !formData[index]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const code = formData.join(""); // Combine all inputs into a single string

        if (code.length < 4) {
            setResetCodeError("Please enter a complete 4-digit code.");
            return;
        }

        try {
            const response: string = await ApiService.post<string>("/auth/verify-reset-code", { email, resetCode: code });
            if (response === "Code is valid") {
                onCodeVerified();
            }
        } catch (error) {
            setResetCodeError("Invalid code. Please try again.");
        }
    };

    const handleResendEmail = (): void => {
        if (resendTimer === 0) {
            ApiService.post<string>("/auth/forgot-password", { email })
                .then(response => alert(response));
            setResendTimer(120); // Reset timer
        }
    };

    return (
        <div className="auth-form-container">
            <p className="font-md-regular password-reset-info">
                {response}
            </p>
            <form className="password-reset-code-form" onSubmit={handleSubmit}>
                <div className="password-reset-code-inputs">
                    {formData.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)} // Assign refs to inputs
                            type="number"
                            className="password-reset-code-input no-spin"
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace") handleBackspace(index);
                            }}
                        />
                    ))}
                </div>
                {resetCodeError && <div className="font-sm-regular auth-error">{resetCodeError}</div>}
                <p className="font-md-regular password-reset-info">
                    Didn't receive the email?
                </p>
                {
                    resendTimer > 0
                        ? (<p className="font-md-regular password-reset-info">
                            You can resend email in
                            <span className="font-md-semibold resend-timer">{resendTimer}</span>
                            seconds.
                        </p>)
                        :
                        (<button className="font-lg-semibold resend-email-btn" onClick={handleResendEmail}>
                            Resend
                        </button>)
                }

                <button type="submit" className="auth-form-btn font-lg-semibold" >Continue</button>
            </form>
        </div>
    )
}