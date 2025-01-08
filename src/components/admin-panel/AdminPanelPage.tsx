import "./AdminPanelPage.css"
import { useState } from "react";
import SideBar from "./side-bar/SideBar";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

export default function AdminPanelPage() {
    const location = useLocation();
    const navigate = useNavigate();
    let [activePanel, setActivePanel] = useState<"movies" | "venues">("movies");

    const handlePanelChange = (panel: "movies" | "venues") => {
        setActivePanel(panel);
        navigate(`/admin/${panel}${panel === "movies" ? "/drafts" : ""}`);
    };

    return (
        <div className="admin-panel-page">
            <SideBar selectPanel={handlePanelChange} activePanel={activePanel} />
            {/* Redirecting to /movies/drafts when /admin is opened */}
            {location.pathname === "/admin" && <Navigate to="/admin/movies/drafts" replace />}
            <Outlet />
            {/* {panel === "movies" ? (<MoviesPanel />) : <></>} */}
        </div>
    )
}