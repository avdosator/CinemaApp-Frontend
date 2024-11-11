import "./DatePickerBtn.css"

type DatePickerBtnProps = {
    date: string,
    day: string,
    pickDate: () => void,
    selected: boolean
}

export default function DatePickerBtn({date, day, pickDate, selected}: DatePickerBtnProps) {
    // it should take prop something like size= "small" or "big", so we can reuse it in movie details page where it is smaller 
    return(
        <button className={selected ? "date-picker-btn selected" : "date-picker-btn"} onClick={pickDate}>
            <div className={selected ? "font-heading-h6 btn-date" : "font-lg-semibold btn-date"} >{date}</div>
            <div className="font-lg-regular btn-day">{day}</div>
        </button>
    )
}