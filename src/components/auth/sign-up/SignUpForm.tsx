import "../AuthForm.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import PasswordToggleIcon from "../password-reset/PasswordToggleIcon";
import { AuthResponse } from "../../../types/AuthResponse";
import ApiService from "../../../service/ApiService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../types/User";
import { useUser } from "../../../context/UserContext";

type SignupFormType = {
    email: string,
    password: string,
    confirmPassword: string
}

type SignUpFormProps = {
    success: () => void,
}

export default function SignUpForm({ success }: SignUpFormProps) {
    const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting }, watch, trigger } = useForm<SignupFormType>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const { setCurrentUser } = useUser();

    const toggleShowPassword = (): void => {
        setShowPassword(prevPassword => !prevPassword);
    }

    const toggleShowConfirmPassword = (): void => {
        setShowConfirmPassword(prevPassword => !prevPassword);
    }

    const emailValue: string | undefined = watch("email");
    const passwordValue: string | undefined = watch("password");
    const confirmPasswordValue: string | undefined = watch("confirmPassword");

    // Validate password match dynamically
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

    const onSubmit: SubmitHandler<SignupFormType> = async (formData) => {
        const createUserData = {
            email: formData.email,
            password: formData.password
        }
        try {
            const response = await ApiService.post<AuthResponse>("/users", createUserData);
            const { jwt, expiresIn } = response;
            const expiryDate = new Date().getTime() + expiresIn;
            localStorage.setItem("authToken", jwt);
            localStorage.setItem("authTokenExpiry", expiryDate.toString());
            const decodedJwt: { sub: string } = jwtDecode(jwt);
            const userEmail: string = decodedJwt.sub;
            const user = await ApiService.get<User>(`/users/email/${encodeURIComponent(userEmail)}`);
            setCurrentUser(user);
            localStorage.setItem("userId", user.id);
            success();
        } catch (error: any) {
            setError("root", { message: error.response.data.message });
        }
    }

    // handle icon color based on input state
    const getContainerClass = (value: string | undefined, error: boolean): string => {
        if (!value) return ""; // No value, reset to default
        return error ? "error" : "populated";
    };

    return (
        <div className="auth-form-container">
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)} >
                {errors.root && <div className="font-md-regular auth-error" style={{ textAlign: "center" }}>{errors.root.message}</div>}
                <div id="sign-up-email-container" className={`auth-input-group ${getContainerClass(emailValue, !!errors.email)}`}>
                    <label htmlFor="email" className="auth-form-label font-lg-semibold">Email</label>
                    <div className="auth-input-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="#344054" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" /></svg>
                        <input
                            {...register("email", {
                                required: "Email address is required.",
                                pattern: {
                                    value: /^(?!(^[.-].*|[^@]*\.@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}$/,
                                    message: "Invalid email address."
                                }
                            })}
                            type="text"
                            name="email"
                            id="email"
                            className="font-lg-regular"
                            placeholder="Email Address"
                        />
                    </div>
                    {errors.email && <div className="font-sm-regular auth-error">{errors.email.message}</div>}
                </div>
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
                        <PasswordToggleIcon
                            onClick={toggleShowPassword}
                            error={Boolean(errors.password && passwordValue)}
                            isVisible={showPassword}
                        />
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
                        <PasswordToggleIcon
                            onClick={toggleShowConfirmPassword}
                            error={Boolean(errors.confirmPassword && confirmPasswordValue)}
                            isVisible={showPassword}
                        />
                    </div>
                    {errors.confirmPassword && <div className="font-sm-regular auth-error">{errors.confirmPassword.message}</div>}
                </div>
                <button type="submit" className="auth-form-btn font-lg-semibold" disabled={isSubmitting}>Sign Up</button>
            </form>
            {/* Add that --- or --- divider after implementing integration with google */}
            <div className="other-login-ways">
                <div className="google-login-btn"></div>
                <div className="mac-login-btn"></div>
            </div>
        </div>
    )
}