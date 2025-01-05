import "./DetailsForm.css"

export default function DetailsForm() {
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
            <div className="upload-photos-container">
                <label htmlFor="" className="font-lg-semibold">Upload Photos</label>
                <div className="file-input-container">
                    <input type="file" className="file-input" />
                </div>
            </div>
        </form>
    )
}