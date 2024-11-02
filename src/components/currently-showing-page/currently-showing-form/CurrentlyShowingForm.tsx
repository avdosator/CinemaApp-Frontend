import "./CurrentlyShowingForm.css"
import DatePickerList from "../../shared-components/date-picker/date-picker-list/DatePickerList";

export default function CurrentlyShowingForm() {
    return (
        <div className="form-container">
            <div className="currently-showing-form">
                <form className="font-lg-regular">
                    <div className="search-movies">
                        <input type="text" className="search-movies-input font-lg-regular form-element" placeholder="Search Movies" />
                    </div>
                    <div className="dropdown-menu-inputs">
                        <select name="city" id="city" className="dropdown-menu-input form-element">
                            <option value="">All cities</option>
                            <option value="Sarajevo">Sarajevo</option>
                            <option value="Mostar">Mostar</option>
                        </select>
                        <select name="venue" id="venue" className="dropdown-menu-input form-element">
                            <option value="">All Cinemas</option>
                            <option value="Cineplexx">Cineplexx</option>
                            <option value="Cinestar">Cinestar</option>
                        </select>
                        <select name="genre" id="genre" className="dropdown-menu-input form-element">
                            <option value="">All Genres</option>
                            <option value="Action">Action</option>
                            <option value="War">War</option>
                            <option value="Drama">Drama</option>
                            <option value="Thriller">Thriller</option>
                        </select>
                        <select name="projectionTime" id="projectionTime" className="dropdown-menu-input form-element">
                            <option value="">All Projection Times</option>
                            <option value="14:00">14:00</option>
                            <option value="16:00">16:00</option>
                            <option value="18:00">18:00</option>
                            <option value="20:00">20:00</option>
                            <option value="22:00">22:00</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="date-picker-container">
                <DatePickerList />
            </div>
        </div>
    )
}