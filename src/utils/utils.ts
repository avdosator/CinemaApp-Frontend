import { DatePickerBtnType } from "../types/DatePickerBtn";
import { AddVenueFormData, DetailsFormData, GeneralFormData, ProjectionsFormData } from "../types/FormData";
import { Seat } from "../types/Seat";
import { Venue } from "../types/Venue";

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

export const calculateReservedSeatsPrice = (selectedSeats: Seat[], ticketPrices: { seatType: string, price: number }[]): number => {
    return selectedSeats.reduce((total, seat) => {
        const matchingPrice = ticketPrices.find(price => price.seatType.toLowerCase() === seat.type.toLowerCase());
        return total + (matchingPrice ? matchingPrice.price : 0);
    }, 0);
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const buildMovieBody = (generalFormData: GeneralFormData, detailsFormData: DetailsFormData, projectionsFormData: ProjectionsFormData[]) => {
    const body = {
        title: capitalize(generalFormData.title.trim()),
        language: capitalize(generalFormData.language.trim()),
        director: capitalize(generalFormData.director.trim()),
        pgRating: capitalize(generalFormData.pgRating.trim()),
        duration: Number(generalFormData.duration.split(" ")[0].trim()),
        genreIds: generalFormData.genre.map(genre => genre.value),
        trailer: generalFormData.trailer.trim(),
        synopsis: capitalize(generalFormData.synopsis.trim()),
        startDate: generalFormData.startDate,
        endDate: generalFormData.endDate,
        writers: detailsFormData.writersData,
        photoUrls: detailsFormData.uploadedPhotoURLs,
        coverPhotoUrl: detailsFormData.uploadedPhotoURLs[detailsFormData.coverPhotoIndex ?? 0],
        cast: detailsFormData.castData,
        projections: projectionsFormData.map(projection => ({
            projectionTime: projection.time,
            cityId: projection.city?.value,
            venueId: projection.venue?.value,
        })),
    }
    return body;
}

export const checkConflictingProjections = (projectionsFormData: ProjectionsFormData[]): boolean => {
    const projectionSet = new Set();
    for (const projection of projectionsFormData) {
        if (projection.city && projection.venue && projection.time) {
            const key = `${projection.city.value}-${projection.venue.value}-${projection.time}`;
            if (projectionSet.has(key)) {
                return true; // Conflicting projection found
            }
            projectionSet.add(key);
        }
    }
    return false; // No conflicts
};

export const initializeVenueFormData = (mode: "add" | "edit" | "view", venueFromState: Venue | null): AddVenueFormData => {
    if (mode === "add") {
        // Default values for "add" mode
        return {
            name: "",
            phone: "",
            street: "",
            streetNumber: "",
            city: { value: "", label: "" },
            photoUrl: "",
        };
    }

    if (venueFromState && (mode === "edit" || mode === "view")) {
        // Use venue data for "edit" or "view" mode
        return {
            name: venueFromState.name,
            phone: venueFromState.phone,
            street: venueFromState.street,
            streetNumber: venueFromState.streetNumber,
            city: {
                value: venueFromState.city.id,
                label: venueFromState.city.name,
            },
            photoUrl: venueFromState.photo.url || "",
        };
    }

    // Fallback for missing data
    return {
        name: "",
        phone: "",
        street: "",
        streetNumber: "",
        city: { value: "", label: "" },
        photoUrl: "",
    };
};

