import "./EditProfileControlButtonGroup.css"
import TertiaryButton from "../../../shared-components/buttons/tertiary-button/TertiaryButton";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../shared-components/buttons/primary-button/PrimaryButton";
import SecondaryButton from "../../../shared-components/buttons/secondary-button/SecondaryButton";

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
                <SecondaryButton label="Cancel" onClick={() => navigate("/user/personal-information")} size="large" />
                <PrimaryButton label="Save Changes" onClick={handleUpdateProfile} size="large" />
            </div>
        </div>
    );
}