import "./DatePickerList.css"
import DatePickerBtn from "../date-picker-btn/DatePickerBtn"

export default function DatePickerList() {
    const today = new Date();
    const dates = Array.from({ length: 10 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return {
            formattedDate: date.toDateString().substring(4, 10),
            dayLabel: i === 0 ? "Today" : date.toDateString().substring(0, 4),
        };
    });

    return (
        <div className="date-picker-list">
            {dates.map((item, index) => (
                <DatePickerBtn key={index} date={item.formattedDate} day={item.dayLabel} />
            ))}
        </div>
    )
}
