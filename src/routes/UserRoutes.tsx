import { Routes, Route, Navigate } from "react-router-dom";
import PersonalInformation from "../components/user-profile-page/personal-information/PersonalInformation";

export default function UserRoutes() {
    return (
        <Routes>
            {/* Redirect to personal information when /user is accessed */}
            <Route path="" element={<Navigate to="/user/personal-information" replace />} />
            <Route path="personal-information" element={<PersonalInformation />} />
        </Routes>
    );
}
