import "./SignUpForm.css"
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type SignupFormType = {
    email: string,
    password: string,
    confirmPassword: string
}

export default function SignUpForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormType>();

    const onSubmit: SubmitHandler<SignupFormType> = (formData) => {
        console.log(formData);
    }

    return (
        <div className="sign-up-form-container">
            <div className="auth-container-heading">
                <div className="auth-back-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#D0D5DD" width="18" height="24" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                </div>
                <h5 className="font-heading-h5 auth-heading">Welcome back</h5>
            </div>
            <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)} >
                <div id="sign-up-email-container" className="sign-up-input-group">
                    <label htmlFor="email" className="sign-up-form-label font-lg-semibold">Email</label>
                    <div className="sign-up-input-wrapper">
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
                    {errors.email && <div className="font-sm-regular sign-up-error">{errors.email.message}</div>}
                </div>
                <div id="sign-up-password-container" className="sign-up-input-group">
                    <label htmlFor="password" className="sign-up-form-label font-lg-semibold">Password</label>
                    <div className="sign-up-input-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="#344054" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" /></svg>
                        <input
                            {...register("password", {
                                required: "Password is required.",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long."
                                },
                                validate: (value) =>
                                    value === watch("confirmPassword") || "Passwords do not match."
                            })}
                            type="password"
                            name="password"
                            id="password"
                            className="font-lg-regular"
                            placeholder="Password"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#667085" className="show-password-icon" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" /></svg>
                        {errors.password && <div className="font-sm-regular sign-up-error">{errors.password.message}</div>}
                    </div>
                </div>
                <div id="sign-up-confirm-password-container" className="sign-up-input-group">
                    <label htmlFor="confirmPassword" className="sign-up-form-label font-lg-semibold">Confirm Password</label>
                    <div className="sign-up-input-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="#344054" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" /></svg>
                        <input
                            {...register("confirmPassword", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long."
                                },
                                validate: (value) =>
                                    value === watch("password") || "Passwords do not match."
                            })}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="font-lg-regular"
                            placeholder="Retype Password"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#667085" className="show-password-icon" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" /></svg>
                    </div>
                    {errors.confirmPassword && <div className="font-sm-regular sign-up-error">{errors.confirmPassword.message}</div>}
                </div>
                <div className="sign-up-form-options">
                    <div id="inputPreview">
                        <input name="rememberMeCheck" id="rememberMeCheck" type="checkbox" className="css-checkbox" />
                        <label htmlFor="rememberMeCheck" className="font-lg-semibold " style={{ color: "#98A2B3" }}>Remember me</label>
                    </div>
                    <Link to="forgot-password-btn" className="no-style-link font-lg-semibold forgot-password-link">Forgot password?</Link>
                </div>
                <button type="submit" className="sign-up-form-btn font-lg-semibold">Sign Up</button>
            </form>
        </div>
    )
}