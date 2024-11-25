import logoNavbar from "../../assets/logo-navbar.png"

export default function AuthContainer() {
    return (
        <div className="auth-container">
            <div className="logo-container">
                <img src={logoNavbar} alt="" />
            </div>
            <div className="auth-container-heading">

            </div>
            <div>LoginForm</div>
            <div>Don't have an account yet?</div>
            <div>Or login with google </div>
        </div>
    )
}