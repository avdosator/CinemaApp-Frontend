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
                <svg xmlns="http://www.w3.org/2000/svg" width={42} height={64} fill="#475467" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg>
                </div>
            </div>
            <div className="horizontal-line"></div>
            <button className="font-lg-semibold notify-me-btn">Notify me</button>
            <p className="body-lg-regular" style={{ color: "#1D2939", marginBottom: "0px" }}>
                Only signed users can be notified. <Link to="#" className="font-lg-semibold signup-anchor">Sign up</Link>
            </p>
        </div>
    )
}