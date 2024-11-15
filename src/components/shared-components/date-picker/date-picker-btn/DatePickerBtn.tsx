import "./DatePickerBtn.css"

type DatePickerBtnProps = {
    size: "small" | "large",
    date: string,
    day: string,
    pickDate: () => void,
    selected: boolean
}

export default function DatePickerBtn({size, date, day, pickDate, selected}: DatePickerBtnProps) {
    // it should take prop something like size= "small" or "big", so we can reuse it in movie details page where it is smaller 
    return(
        <button className={`date-picker-btn-${size} ${selected ? "selected-date-btn" : ""}`} onClick={pickDate}>
            <div className={`btn-date ${selected ? "font-heading-h6" : "font-lg-semibold"}`} >{date}</div>
            <div className="font-lg-regular btn-day">{day}</div>
        </button>
    )
}