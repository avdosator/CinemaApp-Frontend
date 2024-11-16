import { Link } from "react-router-dom"
import "./UpcomingMovieInfo.css"

export default function UpcomingMovieInfo({ title }: { title: string }) {
    return (
        <div className="upcoming-movie-info">
            <h5 className="font-heading-h5 upcoming-movie-info-heading">{`${title} is coming in April!`}</h5>
            <p className="font-lg-regular" style={{ color: "#667085", marginBottom: "0px" }}>Get notified when the movie is part of the schedule.</p>
            <div className="notification-drawing-container" style={{ width: "203px", height: "196px" }}>
                <div className="circle circle-s" id="circle-s-right"></div>
                <div className="circle circle-s" id="circle-s-left"></div>
                <div className="circle circle-m" id="circle-m-top"></div>
                <div className="circle circle-m" id="circle-m-right"></div>
                <div className="circle circle-m" id="circle-m-left"></div>
                <div className="circle circle-l" id="circle-l-top"></div>
                <div className="circle circle-xl">

                </div>
            </div>
            <div className="horizontal-line"></div>
            <button className="font-lg-semibold notify-me-btn">Notify me</button>
            <p className="body-lg-regular" style={{ color: "#1D2939", marginBottom: "0px" }}>
                Only signed users can be notified. <Link to="#" className="signup-anchor">Sign up</Link>
            </p>
        </div>
    )
}