import { useEffect, useRef, useState } from "react";
import "./PasswordResetCode.css"
import "./PasswordResetEmail.css"
import "../AuthForm.css"

type PasswordResetCodeProps = {
    email: string,
    onCodeVerified: () => void
}

export default function PasswordResetCode({ email, onCodeVerified }: PasswordResetCodeProps) {
    const [formData, setFormData] = useState<string[]>(["", "", "", ""]);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [resendTimer, setResendTimer] = useState<number>(120);
    const [error, setError] = useState<string | null>(null);

    const isCodeComplete = formData.every((digit) => digit !== "");

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const code = formData.join(""); // Combine all inputs into a single string

        if (code.length < 4) {
            setError("Please enter a complete 4-digit code.");
            return;
        }

        try {
            // API request for code verification
            console.log(`Verifying code: ${code}`);
            console.log(email);
            onCodeVerified();
        } catch (error) {
            setError("Invalid code. Please try again.");
        }
    };

    const handleResendEmail = (): void => {
        if (resendTimer === 0) {
            // Simulate resending email
            console.log("Resending email...");
            setResendTimer(120); // Reset timer
        }
    };

    return (
        <div className="auth-form-container">
            <p className="font-md-regular password-reset-info">
                We have sent code to your email j******e@gmail.com. Please, enter the code below to verify.
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
                {error && !isCodeComplete && <div className="font-sm-regular auth-error">{error}</div>}
                <p className="font-md-regular password-reset-info">
                    Didn't receive the email?
                </p>
                {
                    resendTimer > 0
                        ? (<p className="font-md-regular password-reset-info">{`You can resend email in ${resendTimer} seconds.`}</p>)
                        : (<button className="font-lg-semibold resend-email-btn" onClick={handleResendEmail}>Resend</button>)
                }

                <button type="submit" className="auth-form-btn font-lg-semibold" >Continue</button>
            </form>
        </div>
    )
}