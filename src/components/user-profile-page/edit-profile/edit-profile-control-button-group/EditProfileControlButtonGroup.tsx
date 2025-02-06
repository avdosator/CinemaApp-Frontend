import "./EditProfileControlButtonGroup.css"
import TertiaryButton from "../../../shared-components/buttons/TertiaryButton";
import { useNavigate } from "react-router-dom";

type EditProfileControlButtonGroupProps = {
    handleUpdateProfile: () => void
}

export default function EditProfileControlButtonGroup({ handleUpdateProfile }: EditProfileControlButtonGroupProps) {
    const navigate = useNavigate();
    return (
        <div className="edit-profile-control-button-group">
            <TertiaryButton label="Deactivate My Account" size="large" />
            <div className="edit-profile-right-button-group font-lg-semibold">
                <button onClick={() => navigate("/user/personal-information")}>Cancel</button>
                <button onClick={handleUpdateProfile}>Save Changes</button>
            </div>
        </div>
    );
}