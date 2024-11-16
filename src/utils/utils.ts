import { DatePickerBtnType } from "../types/DatePickerBtn";

// returns date in string format "YYYY-MM-DD"
export const calculateDateString = (plusDays: number): string => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + plusDays)).toISOString().split("T")[0];
}

export const generateDatePickerBtnInputs = (endDate: Date): DatePickerBtnType[] => {
    const today = new Date();

    // Generate array of objects from today to endDate
    const dates = [];
    let currentDate = new Date(today);

    while (currentDate <= endDate) {
        dates.push({
            isoDate: currentDate.toISOString().split('T')[0], // Format as "YYYY-MM-DD"
            displayDate: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            dayLabel: dates.length === 0 ? "Today" : currentDate.toDateString().substring(0, 4),
        });

        // Increment currentDate by 1 day
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}