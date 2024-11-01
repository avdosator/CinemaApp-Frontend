import "./DatePickerBtn.css"

type DatePickerBtnProps = {
    date: string,
    day: string
}

export default function DatePickerBtn({date, day}: DatePickerBtnProps) {
    // it should take prop something like size= "small" or "big", so we can reuse it in movie details page where it is smaller 
    return(
        <button className="date-picker-btn">
            <div className="font-lg-semibold btn-date">{date}</div>
            <div className="font-lg-regular btn-day">{day}</div>
        </button>
    )
}