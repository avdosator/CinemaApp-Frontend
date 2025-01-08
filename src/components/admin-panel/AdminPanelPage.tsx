import "./AdminPanelPage.css"
import SideBar from "./side-bar/SideBar";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

export default function AdminPanelPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const handlePanelChange = (panel: "movies" | "venues") => {
        navigate(`/admin/${panel}${panel === "movies" ? "/drafts" : ""}`);
    };

    return (
        <div className="admin-panel-page">
            <SideBar selectPanel={handlePanelChange} />
            
            {/*  Redirects to /admin/movies/drafts if accessing /admin directly */}
            {location.pathname === "/admin" && <Navigate to="/admin/movies/drafts" replace />}
            <Outlet />
        </div>
    )
}