import DatePickerList from "../../shared-components/date-picker/date-picker-list/DatePickerList";

export default function CurrentlyShowingForm() {
    return (
        <div className="form-container">
            <div className="currently-showing-form">
                <form>
                    <div>
                        <label htmlFor="">Search Movies</label>
                        <input type="text" />
                    </div>
                    <div>
                        <div>
                            <select name="city" id="city">
                                <option value="">All cities</option>
                                <option value="Sarajevo">Sarajevo</option>
                                <option value="Mostar">Mostar</option>
                            </select>
                        </div>
                        <div>
                            <select name="venue" id="venue">
                                <option value="">All Cinemas</option>
                                <option value="Cineplexx">Cineplexx</option>
                                <option value="Cinestar">Cinestar</option>
                            </select>
                        </div>
                        <div>
                            <select name="genre" id="genre">
                                <option value="">All Genres</option>
                                <option value="Action">Action</option>
                                <option value="War">War</option>
                                <option value="Drama">Drama</option>
                                <option value="Thriller">Thriller</option>
                            </select>
                        </div>
                        <div>
                            <select name="projectionTime" id="projectionTime">
                                <option value="">All Projection Times</option>
                                <option value="14:00">14:00</option>
                                <option value="16:00">16:00</option>
                                <option value="18:00">18:00</option>
                                <option value="20:00">20:00</option>
                                <option value="22:00">22:00</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div className="date-picker-container">
                <DatePickerList />
            </div>
        </div>
    )
}