import "./AuthSuccess.css"
import "../../movie-details-page/upcoming-movie-info/notification-drawing/NotificationDrawing.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { useNavigate } from "react-router-dom"
import PrimaryButton from "../../shared-components/buttons/primary-button/PrimaryButton"

type AuthSuccessProps = {
    text: string,
    icon: IconProp,
    btn?: boolean,
    closeAuthContainer?: () => void
}

export default function AuthSuccess({ text, icon, btn = false, closeAuthContainer }: AuthSuccessProps) {
    const navigate = useNavigate();

    const seeMovies = () => {
        closeAuthContainer!();
        navigate("/movies/currently-showing");
    }
    return (
        <div className="auth-form-container">
            <p className="font-md-regular password-reset-info">{text}</p>
            <div className="notification-drawing-container" style={{ marginTop: "32px", marginBottom: "32px" }}>
                <div className="circle circle-s" id="circle-sm-right"></div>
                <div className="circle circle-s" id="circle-sm-left"></div>
                <div className="circle circle-m" id="circle-md-top"></div>
                <div className="circle circle-m" id="circle-md-right"></div>
                <div className="circle circle-m" id="circle-md-bottom"></div>
                <div className="circle circle-m" id="circle-md-left"></div>
                <div className="circle circle-l" id="circle-lg-top"></div>
                <div className="circle circle-l" id="circle-lg-right"></div>
                <div className="circle circle-l" id="circle-lg-bottom"></div>
                <div className="circle circle-xl" id="main-circle">
                    <FontAwesomeIcon icon={icon} className="successful-auth-icon" />
                </div>
            </div>
            {btn && <PrimaryButton label="See Movies" isFullWidth={true} onClick={seeMovies} size="large" />}
        </div>
    )
}