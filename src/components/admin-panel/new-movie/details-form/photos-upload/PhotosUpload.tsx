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
             <div style={{marginBottom: "96px"}}>
                <label htmlFor="" className="font-lg-semibold upload-photos-label">Upload Photos</label>
                <div className="upload-photos-container" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="font-lg-underline-semibold photo-upload-btn">+ Upload Photos</p>
                    <p className="font-md-regular" style={{ marginBottom: "12px" }}>or just drag and drop</p>
                    <p className="font-sm-regular">* Add up to 4 photos</p>
                </div>
            </div>
        </div>
    );
}