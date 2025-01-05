import { useDropzone } from "react-dropzone";
import "./DetailsForm.css"

export default function DetailsForm() {
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 4,
    });

    return (
        <form className="details-form">
            <div className="writers-cast-container">
                <div className="upload-writers-container">
                    <label htmlFor="" className="font-lg-semibold">Writers</label>
                    <div className="file-input-container">
                        <input type="file" className="file-input" />
                    </div>
                </div>
                <div className="upload-cast-container">
                    <label htmlFor="" className="font-lg-semibold">Cast</label>
                    <div className="file-input-container">
                        <input type="file" className="file-input" />
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="" className="font-lg-semibold upload-photos-label">Upload Photos</label>
                <div className="upload-photos-container" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="font-lg-underline-semibold photo-upload-btn">+ Upload Photos</p>
                    <p className="font-md-regular" style={{ marginBottom: "12px" }} >or just drag and drop</p>
                    <p className="font-sm-regular">* Add up to 4 photos</p>
                </div>
            </div>
        </form>
    )
}