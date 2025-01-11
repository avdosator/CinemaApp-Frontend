import { Link } from "react-router-dom"
import "./UpcomingMovieInfo.css"
import NotificationDrawing from "./notification-drawing/NotificationDrawing"
import { useUser } from "../../../context/UserContext"

type UpcomingMovieInfoProps = {
    title: string,
    openLoginForm: (path?: string, state?: any) => void
}

export default function UpcomingMovieInfo({ title, openLoginForm }: UpcomingMovieInfoProps) {
    const { currentUser } = useUser();

        return (
            <div className="upcoming-movie-info">
                <div className="upcoming-movie-main-info">
                    <h5 className="font-heading-h5 upcoming-movie-info-heading">{`${title} is coming soon!`}</h5>
                    <p className="font-lg-regular" style={{ color: "#667085", marginBottom: "0px" }}>Get notified when the movie is part of the schedule.</p>
                </div>
                <NotificationDrawing />
                <div className="notify-me-container">
                    <div className="horizontal-divider"></div>
                    <button className="font-lg-semibold notify-me-btn" disabled>Notify me</button>
                    {!currentUser && (<p className="body-lg-regular">
                        Only signed users can be notified. <Link to="#" className="font-lg-semibold signup-anchor" onClick={() => openLoginForm()}>Sign up</Link>
                    </p>)}

                </div>
            </div>
        )
}