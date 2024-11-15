import "./DatePickerBtnSmall.css"

type DatePickerBtnProps = {
    date: string,
    day: string,
    //pickDate: () => void,
    selected: boolean
}

export default function DatePickerBtnSmall({ date, day, selected }: DatePickerBtnProps) {
    return (
        <button className={`date-picker-btn-small ${selected ? "selected-date-btn-small" : ""}`}>
            <div className="btn-date-small font-heading-h6" >{date}</div>
            <div className="font-lg-regular btn-day-small">{day}</div>
        </button>
    )
}