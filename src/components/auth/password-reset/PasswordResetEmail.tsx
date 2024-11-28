import { SubmitHandler, useForm } from "react-hook-form";

export default function PasswordResetEmail() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, watch } = useForm<{ email: string }>();

    const emailValue: string | undefined = watch("email");

    const onSubmit: SubmitHandler<{ email: string }> = async (formData) => {
        try {
            // send request
            console.log(formData);
        } catch (error) {
            setError("email", { message: "Invalid request" });
        }
    }

    const getContainerClass = (value: string | undefined, error: boolean): string => {
        if (!value) return ""; // No value, reset to default
        return error ? "error" : "populated";
    };
    return (
        <div>
            <p className="font-md-regular" style={{ color: "#98A2B3" }}>
                Provide your account’s email for which you want to reset your password.
            </p>
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className={`auth-input-group ${getContainerClass(emailValue, !!errors.email)}`}>
                    <label htmlFor="email" className="auth-form-label font-lg-semibold">Email</label>
                    <div className="auth-input-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="#344054" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" /></svg>
                        <input
                            {...register("email", {
                                required: "Email address is required.",
                                pattern: {
                                    value: /^(?!(^[.-].*|[^@]*\.@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}$/,
                                    message: "Invalid email. Please check for typos and ensure it's a valid address."
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
                <button type="submit" className="auth-form-btn font-lg-semibold" disabled={isSubmitting}>Sign In</button>
            </form>
        </div>
    )
}