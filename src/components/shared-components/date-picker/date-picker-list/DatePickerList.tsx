import "./DatePickerList.css"
import DatePickerBtn from "../date-picker-btn/DatePickerBtn"
import { DatePickerBtnType } from "../../../../types/DatePickerBtn";
import { generateDatePickerBtnInputs } from "../../../../utils/utils";

type DatePickerListProps = {
    pickDate: (date: string) => void;
    selectedDate: string;
};

export default function DatePickerList({ pickDate, selectedDate }: DatePickerListProps) {
    // Generate 10 DatePickerBtn inputs starting from today
    const dates: DatePickerBtnType[] = generateDatePickerBtnInputs(new Date(Date.now() + 9 * 24 * 60 * 60 * 1000));

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
