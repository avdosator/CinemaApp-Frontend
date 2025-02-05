import "./EditProfileControlButtonGroup.css"
import TertiaryButton from "../../../shared-components/buttons/TertiaryButton";
import { useNavigate } from "react-router-dom";

export default function EditProfileControlButtonGroup() {
    const navigate = useNavigate();
    return (
        <div className="edit-profile-control-button-group">
            <TertiaryButton label="Deactivate My Account" size="large" />
            <div className="edit-profile-right-button-group font-lg-semibold">
                <button onClick={() => navigate("/user/personal-information")}>Cancel</button>
                <button>Save Changes</button>
            </div>
        </div>
    );
}