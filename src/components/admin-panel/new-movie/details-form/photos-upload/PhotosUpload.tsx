import "./PhotosUpload.css"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TertiaryButton from "../../../../shared-components/buttons/TertiaryButton";
import PhotoPlaceholder from "./photo-placeholder/PhotoPlaceholder";

type PhotosUploadProps = {
    uploadedPhotos: File[];
    setUploadedPhotos: React.Dispatch<React.SetStateAction<File[]>>;
    coverPhotoIndex: number | null;
    getRootProps: () => any;
    getInputProps: () => any;
    handleRemovePhoto: (index: number) => void;
    handleSetCoverPhoto: (index: number) => void;
    placeholderRefs: React.RefObject<HTMLInputElement>[];
};

export default function PhotosUpload({
    uploadedPhotos,
    setUploadedPhotos,
    coverPhotoIndex,
    getRootProps,
    getInputProps,
    handleRemovePhoto,
    handleSetCoverPhoto,
    placeholderRefs
}: PhotosUploadProps) {

    return (
        <div>
            <label className="font-lg-semibold upload-photos-label">Upload Photos</label>
            {uploadedPhotos.length == 0
                ? (
                    <div style={{ marginBottom: "96px" }}>
                        <div className="upload-photos-container" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className="font-lg-underline-semibold photo-upload-btn">+ Upload Photos</p>
                            <p className="font-md-regular" style={{ marginBottom: "12px" }}>or just drag and drop</p>
                            <p className="font-sm-regular">* Add up to 4 photos</p>
                        </div>
                    </div>
                )
                : (
                    <div className="uploaded-photos-preview">
                        {uploadedPhotos.map((file, index) => (
                            <div key={index} className="uploaded-photo-preview-item">
                                <img
                                    src={URL.createObjectURL(file)}
                                    className="uploaded-photo-thumbnail"
                                />
                                <div className="upload-photo-btn-container">
                                    <TertiaryButton label="Upload Photo" size="large" color="#FCFCFD" />
                                </div>
                                <div className="uploaded-photo-actions">
                                    <label className="font-md-semibold">
                                        <input
                                            type="radio"
                                            name="coverPhoto"
                                            checked={coverPhotoIndex === index}
                                            onChange={() => handleSetCoverPhoto(index)}
                                        />
                                        Cover Photo
                                    </label>
                                    <button
                                        type="button"
                                        className="remove-photo-btn"
                                        onClick={() => handleRemovePhoto(index)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} width={14} height={16} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Placeholders when less than 4 photos are added first time */}
                        {Array.from({ length: 4 - uploadedPhotos.length }).map((_, index) => (
                            <PhotoPlaceholder
                                key={`placeholder-${index}`}
                                inputRef={placeholderRefs[index]}
                                onPhotoUpload={(file) => setUploadedPhotos((prev) => [...prev, file])}
                            />
                        ))}
                    </div>
                )}
        </div>
    );
}