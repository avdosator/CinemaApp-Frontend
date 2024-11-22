import "./DatePickerBtn.css"

type DatePickerBtnProps = {
    date: string,
    day: string,
    pickDate: () => void,
    selected: boolean
}

export default function DatePickerBtn({date, day, pickDate, selected}: DatePickerBtnProps) {
    return(
        <button className={`date-picker-btn-large ${selected ? "selected-date-btn" : ""}`} onClick={pickDate}>
            <div className={`btn-date ${selected ? "font-heading-h6" : "font-lg-semibold"}`} >{date}</div>
            <div className="font-lg-regular btn-day">{day}</div>
        </button>
    )
}