import "./DatePickerList.css"
import DatePickerBtn from "../date-picker-btn/DatePickerBtn"
import { DatePickerBtnType } from "../../../../types/DatePickerBtn";

type DatePickerListProps = {
    pickDate: (date: string) => void;
    selectedDate: string;
};

export default function DatePickerList({ pickDate, selectedDate }: DatePickerListProps) {
    const today = new Date();
    const dates: DatePickerBtnType[] = Array.from({ length: 10 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return {
            isoDate: date.toISOString().split('T')[0],  // Format date as "YYYY-MM-DD"
            displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),  // Format for display
            dayLabel: i === 0 ? "Today" : date.toDateString().substring(0, 4),
        };
    });

    return (
        <div className="date-picker-list">
            {dates.map((item, index) => (
                <DatePickerBtn key={index}
                    date={item.displayDate}
                    day={item.dayLabel}
                    pickDate={() => pickDate(item.isoDate)}
                    selected={selectedDate === item.isoDate}
                />
            ))}
        </div>
    )
}
