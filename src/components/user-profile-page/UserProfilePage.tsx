import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import UserProfileSideBar from "./user-profile-side-bar/UserProfileSideBar";

export default function UserProfilePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const handlePanelChange = (panel: "personal-information") => {
        navigate(`/user/${panel}`);
    };

    return (
        <div className="admin-panel-page">
            <UserProfileSideBar selectPanel={handlePanelChange} />
            
            {location.pathname === "/user" && <Navigate to="/user/personal-information" replace />}
            <Outlet />
        </div>
    )
}