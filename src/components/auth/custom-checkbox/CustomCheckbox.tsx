export default function CustomCheckbox() {
    return (
        <div id="inputPreview">
            <input name="rememberMeCheck" id="rememberMeCheck" type="checkbox" className="css-checkbox" />
            <label htmlFor="rememberMeCheck" className="font-lg-semibold " style={{ color: "#98A2B3" }}>Remember me</label>
        </div>
    )
}