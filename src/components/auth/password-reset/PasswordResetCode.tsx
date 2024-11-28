import { useRef, useState } from "react";
import "./PasswordResetCode.css"
import "./PasswordResetEmail.css"

export default function PasswordResetCode() {
    const [code, setCode] = useState<string[]>(["", "", "", ""]);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleInputChange = (index: number, value: string): void => {
        if (/^\d?$/.test(value)) { // Allow only single digit or empty
            const newCode: string[] = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Move focus to the next input if not empty
            if (value && index < code.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    // Move focus to previous input with backspace
    const handleBackspace = (index: number): void => {
        if (index > 0 && !code[index]) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    return (
        <div className="password-reset-code-container">
            <p className="font-md-regular password-reset-email-info">
                We have sent code to your email j******e@gmail.com. Please, enter the code below to verify.
            </p>
            <form className="password-reset-code-form">
                <div className="password-reset-code-inputs">
                    {code.map((digit, index) => (
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