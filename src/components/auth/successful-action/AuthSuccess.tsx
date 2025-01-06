import "./AuthSuccess.css"
import "../../movie-details-page/upcoming-movie-info/notification-drawing/NotificationDrawing.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { Link } from "react-router-dom"

type AuthSuccessProps = {
    text: string,
    icon: IconProp,
    btn?: boolean,
    closeAuthContainer?: () => void
}

export default function AuthSuccess({ text, icon, btn = false, closeAuthContainer }: AuthSuccessProps) {
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
            {btn &&
                (<Link onClick={() => closeAuthContainer!()} to="/movies/currently-showing" className="auth-form-btn no-style-link font-lg-semibold">
                    See Movies
                </Link>)
            }
        </div>
    )
}