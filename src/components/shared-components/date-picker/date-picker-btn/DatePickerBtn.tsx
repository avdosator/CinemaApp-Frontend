import "./DatePickerBtn.css"

type DatePickerBtnProps = {
    date: string,
    day: string,
    pickDate: () => void
}

export default function DatePickerBtn({date, day, pickDate}: DatePickerBtnProps) {
    // it should take prop something like size= "small" or "big", so we can reuse it in movie details page where it is smaller 
    return(
        <button className="date-picker-btn" onClick={pickDate}>
            <div className="font-lg-semibold btn-date">{date}</div>
            <div className="font-lg-regular btn-day">{day}</div>
        </button>
    )
}