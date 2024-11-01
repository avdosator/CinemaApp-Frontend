import "./CurrentlyShowingPage.css"
import DatePickerList from "../shared-components/date-picker/date-picker-list/DatePickerList";
import MovieCardBigList from "./movie-card-big-list/MovieCardBigList";

export default function CurrentlyShowingPage() {
    return(
        <>  
            <h4 className="font-heading-h4 currently-showing-caption">Currently showing(9)</h4>
            <DatePickerList />
            <div className="font-md-italic-regular date-reminder">
                Quick reminder that our cinema schedule is on a ten-day update cycle.
            </div>
            <MovieCardBigList />
        </>
    )
}