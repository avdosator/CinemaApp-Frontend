export default function VenuesPanel() {
    return (
        <div className="venues-panel">
            <div className="venues-panel-heading">
                <h6 className="font-heading-h6" style={{ color: "#1D2939", marginBottom: "10px" }}>Venues (7)</h6>
                <button className="add-movie-btn font-lg-semibold" style={{ alignSelf: "flex-start" }} onClick={() => console.log("create venue")}>Add Venue</button>
                <div className="full-width-horizontal-line"></div>
            </div>
        </div>

    );
}