import "./UserProfileSideBar.css"
import { useLocation } from "react-router-dom";

type UserProfileSideBarProps = {
    selectPanel: (panel: "personal-information") => void,
}

export default function UserProfileSideBar({ selectPanel }: UserProfileSideBarProps) {
    const location = useLocation();
    const activePanel = location.pathname.includes("personal-information") ? "personal-information" : "";

    return (
        <div className="side-bar-container">
            <h5 className="font-heading-h5" style={{ color: "#FCFCFD", marginBottom: "21px" }}>User Profile</h5>
            {/* <div> */}
            {/* <span className="font-sm-regular">General</span> */}
            <div className="full-width-horizontal-line" style={{ backgroundColor: "#667085", height: "1px" }}></div>
            {/* </div> */}
            <button
                className={`side-bar-btn ${activePanel === "personal-information" ? "font-lg-underline-semibold" : "font-lg-regular"}`}
                style={{ color: activePanel === "personal-information" ? "#FCFCFD" : "#D0D5DD", paddingRight: "0px" }}
                onClick={() => selectPanel("personal-information")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FCFCFD" width={16} height={24} viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" /></svg>
                Personal Information
            </button>

        </div>
    )
}