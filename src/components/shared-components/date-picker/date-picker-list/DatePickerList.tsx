import "./DatePickerList.css"
import DatePickerBtn from "../date-picker-btn/DatePickerBtn"

export default function DatePickerList() {
    // this array will represent todays date + 9 next dates (should be updated every day)
    const array: { date: string, day: string }[] = [{ date: "Oct 31", day: "Today" }, { date: "Nov 1", day: "Fri" }, { date: "Nov 2", day: "Sat" }, { date: "Nov 3", day: "Sun" },
    { date: "Nov 4", day: "Mon" }, { date: "Nov 5", day: "Tue" }, { date: "Nov 6", day: "Wed" }, { date: "Nov 7", day: "Tue" },
    { date: "Nov 8", day: "Fri" }, { date: "Nov 9", day: "Sat" }
    ]
    return (
        <div className="date-picker-list">
            {array.map((item, index) => (
                <DatePickerBtn  key={index} date={item.date} day={index === 0 ? "Today" : item.day} />
            ))}
        </div>
    )
}