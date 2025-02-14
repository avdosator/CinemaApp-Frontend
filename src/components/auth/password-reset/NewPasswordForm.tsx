import { jwtDecode } from "jwt-decode";
import ApiService from "../../../service/ApiService";
import { AuthResponse } from "../../../types/AuthResponse";
import "../AuthForm.css"
import "./PasswordReset.css"
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../../types/User";
import { useUser } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

type NewPasswordForm = {
    password: string,
    confirmPassword: string
}

type NewPasswordFormProps = {
    email: string,
    success: () => void,
    closeAuthContainer: () => void
}

export default function NewPasswordForm({ email, success, closeAuthContainer }: NewPasswordFormProps) {
    const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting }, watch, trigger } = useForm<NewPasswordForm>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const { setCurrentUser } = useUser();
    const navigate = useNavigate();

    const toggleShowPassword = (): void => {
        setShowPassword(prevPassword => !prevPassword);
    }

    const toggleShowConfirmPassword = (): void => {
        setShowConfirmPassword(prevPassword => !prevPassword);
    }

    const passwordValue: string | undefined = watch("password");
    const confirmPasswordValue: string | undefined = watch("confirmPassword");

    useEffect(() => {
        if (confirmPasswordValue && confirmPasswordValue !== passwordValue) {
            setError("password", { message: "Passwords do not match." });
            setError("confirmPassword", { message: "Passwords do not match." });
        } else {
            clearErrors("password");
            clearErrors("confirmPassword");
        }
    }, [passwordValue, confirmPasswordValue, setError, clearErrors]);


    useEffect(() => {
        if (passwordValue) {
            trigger("confirmPassword"); // Revalidate confirmPassword when password changes
        }
    }, [passwordValue, trigger]);

    const onSubmit: SubmitHandler<NewPasswordForm> = async (formData) => {
        try {
            const response = await ApiService.post<AuthResponse>("/users/change-password", { email, newPassword: formData.password });
            const { jwt, expiresIn, refreshToken } = response;
            const expiryDate = new Date().getTime() + expiresIn;
            localStorage.setItem("authToken", jwt);
            localStorage.setItem("authTokenExpiry", expiryDate.toString());
            localStorage.setItem("refreshToken", refreshToken);

            // Get user by email from payload
            const decodedJwt: { sub: string } = jwtDecode(jwt);
            const userEmail: string = decodedJwt.sub;
            const user = await ApiService.get<User>(`/users/email/${encodeURIComponent(userEmail)}`);
            setCurrentUser(user);
            localStorage.setItem("userId", user.id);
            success();
            setTimeout(() => {
                closeAuthContainer();
                navigate("/home");
            }, 2000);
        } catch (error) {
            setError("password", {
                message: "This password is already taken"
            });
        }
    }

    // handle icon color based on input state
    const getContainerClass = (value: string | undefined, error: boolean): string => {
        if (!value) return ""; // No value, reset to default
        return error ? "error" : "populated";
    };

    return (
        <div className="auth-form-container">
            <p className="font-md-regular password-reset-info">
                Please, enter and confirm your new password.
            </p>
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div id="sign-up-password-container" className={`auth-input-group ${getContainerClass(passwordValue, !!errors.password)}`}>
                    <label htmlFor="password" className="auth-form-label font-lg-semibold">Password</label>
                    <div className="auth-input-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="#344054" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" /></svg>
                        <input
                            {...register("password", {
                                required: "Password is required.",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long."
                                },
                                onChange: () => clearErrors("confirmPassword")
                            })}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            className="font-lg-regular"
                            placeholder="Password"
                        />
                        <svg
                            onClick={toggleShowPassword}
                            className={`show-password-icon ${errors.password && passwordValue ? "error-icon" : ""}`}
                            fill={
                                errors.password && passwordValue
                                    ? "#FDA29B" // Error color if there's an error and value exists
                                    : !passwordValue
                                        ? "#667085" // Default color when input is empty
                                        : "#344054" // Default color for populated field
                            }
                            viewBox="0 0 640 512"
                        >
                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" /></svg>
                    </div>
                    {errors.password && <div className="font-sm-regular auth-error">{errors.password.message}</div>}
                </div>
                <div id="sign-up-confirm-password-container" className={`auth-input-group ${getContainerClass(confirmPasswordValue, !!errors.confirmPassword)}`}>
                    <label htmlFor="confirmPassword" className="auth-form-label font-lg-semibold">Confirm Password</label>
                    <div className="auth-input-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="#344054" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" /></svg>
                        <input
                            {...register("confirmPassword", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long."
                                },
                                validate: (value) => value === passwordValue || "Passwords do not match."
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            className="font-lg-regular"
                            placeholder="Retype Password"
                        />
                        <svg
                            onClick={toggleShowConfirmPassword}
                            className={`show-password-icon ${errors.confirmPassword && confirmPasswordValue ? "error-icon" : ""}`}
                            fill={
                                errors.confirmPassword && confirmPasswordValue
                                    ? "#FDA29B" // Error color if there's an error and value exists
                                    : !passwordValue
                                        ? "#667085" // Default color when input is empty
                                        : "#344054" // Default color for populated field
                            }
                            viewBox="0 0 640 512"
                        >
                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" /></svg>
                    </div>
                    {errors.confirmPassword && <div className="font-sm-regular auth-error">{errors.confirmPassword.message}</div>}
                </div>
                <button type="submit" className="auth-form-btn font-lg-semibold" disabled={isSubmitting}>Continue</button>
            </form>
        </div>
    )
}