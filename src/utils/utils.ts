// returns date in string format "YYYY-MM-DD"
export const calculateDateString = (plusDays: number): string => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + plusDays)).toISOString().split("T")[0];
}