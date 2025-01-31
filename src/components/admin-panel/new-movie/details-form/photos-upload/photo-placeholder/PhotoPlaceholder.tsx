import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import placeholderImage from "../../../../../../assets/upload-photo-placeholder.jpg";
import TertiaryButton from "../../../../../shared-components/buttons/TertiaryButton";

type PhotoPlaceholderProps = {
    inputRef: React.RefObject<HTMLInputElement>;
    onPhotoUpload: (file: File) => void;
};

export default function PhotoPlaceholder({ inputRef, onPhotoUpload }: PhotoPlaceholderProps) {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onPhotoUpload(file);
        }
    };

    return (
        <div className="uploaded-photo-preview-item">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{ display: "none", cursor: "default" }}
                onChange={handleFileChange}
            />
            <img
                className="uploaded-photo-thumbnail"
                src={placeholderImage}
                style={{ opacity: "0.6" }}
            />
            <div className="upload-photo-btn-container">
                <TertiaryButton
                    label="Upload Photo"
                    size="large"
                    color="#FCFCFD"
                    onClick={() => inputRef.current?.click()}
                />
            </div>
            <div className="uploaded-photo-actions">
                <label className="font-md-semibold">
                    <input type="radio" disabled />
                    Cover Photo
                </label>
                <button type="button" className="remove-photo-btn" disabled>
                    <FontAwesomeIcon icon={faTrash} width={14} height={16} />
                </button>
            </div>
        </div>
    );
}
