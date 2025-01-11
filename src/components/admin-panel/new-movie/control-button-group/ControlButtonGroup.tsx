import "./ControlButtonGroup.css"

export default function ControlButtonGroup() {
    return (
        <div className="add-movie-control-btns">
            <button className="font-lg-underline-semibold">Back</button>
            <div>
                <button className="font-lg-semibold">Save to Drafts</button>
                <button className="font-lg-semibold">Continue</button>
            </div>
        </div>
    )
}