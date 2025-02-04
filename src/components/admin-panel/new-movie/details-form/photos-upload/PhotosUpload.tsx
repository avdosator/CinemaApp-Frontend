import "./PhotosUpload.css"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TertiaryButton from "../../../../shared-components/buttons/TertiaryButton";
import PhotoPlaceholder from "./photo-placeholder/PhotoPlaceholder";
import { useRef } from "react";
import { DetailsFormData } from "../../../../../types/FormData";
import { useDropzone } from "react-dropzone";

type PhotosUploadProps = {
    detailsFormData: DetailsFormData,
    setDetailsFormData: React.Dispatch<React.SetStateAction<DetailsFormData>>
};

export default function PhotosUpload({ detailsFormData, setDetailsFormData }: PhotosUploadProps) {
    const placeholderRefs = Array(4).fill(null).map(() => useRef<HTMLInputElement>(null));

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 4,
        onDrop: (acceptedFiles) => {
            if (detailsFormData.uploadedPhotos.length + acceptedFiles.length > 4) {
                alert("You can only upload up to 4 photos.");
                return;
            }
            setDetailsFormData((prev) => ({
                ...prev,
                uploadedPhotos: [...prev.uploadedPhotos, ...acceptedFiles]
            }));
        }
    });

    const handleRemovePhoto = (index: number) => {
        setDetailsFormData((prev) => {
            if (index < prev.uploadedPhotoURLs.length) {
                // Removing from preloaded photos
                const updatedURLs = prev.uploadedPhotoURLs.filter((_, i) => i !== index);
                return {
                    ...prev,
                    uploadedPhotoURLs: updatedURLs,
                    coverPhotoIndex: prev.coverPhotoIndex === index ? null : prev.coverPhotoIndex
                };
            } else {
                // Removing from uploaded photos
                const adjustedIndex = index - prev.uploadedPhotoURLs.length;
                const updatedFiles = prev.uploadedPhotos.filter((_, i) => i !== adjustedIndex);
                return {
                    ...prev,
                    uploadedPhotos: updatedFiles,
                    coverPhotoIndex: prev.coverPhotoIndex === index ? null : prev.coverPhotoIndex
                };
            }
        });
    };

    const handleSetCoverPhoto = (index: number) => {
        setDetailsFormData((prev) => ({
            ...prev,
            coverPhotoIndex: index
        }));
    };

    return (
        <div>
            <label className="font-lg-semibold upload-photos-label">Upload Photos</label>
            {detailsFormData.uploadedPhotos.length == 0 && detailsFormData.uploadedPhotoURLs.length == 0
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
                        {detailsFormData.uploadedPhotoURLs.map((url, index) => (
                            <div key={`preloaded-${index}`} className="uploaded-photo-preview-item">
                                <img src={url} className="uploaded-photo-thumbnail" />
                                <div className="uploaded-photo-actions">
                                    <label className="font-md-semibold">
                                        <input
                                            type="radio"
                                            name="coverPhoto"
                                            checked={detailsFormData.coverPhotoIndex === index}
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
                        {detailsFormData.uploadedPhotos.map((file, index) => (
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
                                            checked={detailsFormData.coverPhotoIndex === index}
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
                        {Array.from({ length: 4 - (detailsFormData.uploadedPhotoURLs.length + detailsFormData.uploadedPhotos.length) }).map((_, index) => (
                            <PhotoPlaceholder
                                key={`placeholder-${index}`}
                                inputRef={placeholderRefs[index]}
                                onPhotoUpload={(file) =>
                                    setDetailsFormData((prev) => ({
                                        ...prev,
                                        uploadedPhotos: [...prev.uploadedPhotos, file]
                                    }))
                                }
                            />
                        ))}
                    </div>
                )}
        </div>
    );
}