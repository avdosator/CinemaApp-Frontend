import "./PhotosUpload.css"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function PhotosUpload() {
    const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
    const [coverPhotoIndex, setCoverPhotoIndex] = useState<number | null>(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 4,
        onDrop: (acceptedFiles) => {
            if (uploadedPhotos.length + acceptedFiles.length > 4) {
                alert("You can only upload up to 4 photos.");
                return;
            }
            setUploadedPhotos((prev) => [...prev, ...acceptedFiles]);
        }
    });

    const handleRemovePhoto = (index: number) => {
        setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
        if (index === coverPhotoIndex) {
            setCoverPhotoIndex(null);
        }
    };

    const handleSetCoverPhoto = (index: number) => {
        setCoverPhotoIndex(index);
    };

    return (
        <div>
            {uploadedPhotos.length == 0
                ? (
                    <div style={{ marginBottom: "96px" }}>
                        <label htmlFor="" className="font-lg-semibold upload-photos-label">Upload Photos</label>
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
                                <div className="uploaded-photo-actions">
                                    <label className="cover-photo-label">
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
                    </div>
                )}
        </div>
    );
}