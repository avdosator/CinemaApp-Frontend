import "./EditProfileControlButtonGroup.css"
import TertiaryButton from "../../../shared-components/buttons/TertiaryButton";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../shared-components/buttons/primary-button/PrimaryButton";

type EditProfileControlButtonGroupProps = {
    handleUpdateProfile: () => void,
    deactivateProfile: () => void
}

export default function EditProfileControlButtonGroup({ handleUpdateProfile, deactivateProfile }: EditProfileControlButtonGroupProps) {
    const navigate = useNavigate();
    return (
        <div className="edit-profile-control-button-group">
            <TertiaryButton label="Deactivate My Account" size="large" onClick={deactivateProfile} />
            <div className="edit-profile-right-button-group font-lg-semibold">
                <button onClick={() => navigate("/user/personal-information")}>Cancel</button>
                <PrimaryButton label="Save Changes" onClick={handleUpdateProfile} style={{ marginTop: "0px" }} />
            </div>
        </div>
    );
}