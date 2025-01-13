import { DatePickerBtnType } from "../types/DatePickerBtn";
import { Seat } from "../types/Seat";

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

// export const calculateReservedSeatsPrice = (selectedSeats: Seat[]): number => {
//     return selectedSeats.reduce((sum, seat) => {
//         switch (seat.type) {
//             case "regular":
//                 return sum + 7;
//             case "VIP":
//                 return sum + 10;
//             case "love":
//                 return sum + 24;
//             default:
//                 return sum;
//         }
//     }, 0);
// }

export const calculateReservedSeatsPrice = (selectedSeats: Seat[], ticketPrices: { seatType: string, price: number }[]): number => {
    return selectedSeats.reduce((total, seat) => {
        const matchingPrice = ticketPrices.find(price => price.seatType.toLowerCase() === seat.type.toLowerCase());
        return total + (matchingPrice ? matchingPrice.price : 0);
    }, 0);
};