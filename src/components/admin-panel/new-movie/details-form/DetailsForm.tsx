export default function DetailsForm() {
    return (
        <form className="details-form">
            <div className="writers-cast-container">
                <div className="upload-writers-container">
                    <label htmlFor="">Writers</label>
                    <input type="file" />
                </div>
                <div className="upload-cast-container">
                    <label htmlFor="">Cast</label>
                    <input type="file" />
                </div>
            </div>
            <div className="upload-photos-container">
                <label htmlFor="">Upload Photos</label>
                <input type="file" />
            </div>
        </form>
    )
}