import "./NewMovie.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneralForm from "./general-form/GeneralForm";
import ControlButtonGroup from "./control-button-group/ControlButtonGroup";
import { useState, useEffect } from "react";
import ApiService from "../../../service/ApiService";
import { GeneralFormData } from "../../../types/FormData";
import { Genre } from "../../../types/Genre";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { SelectOptionType } from "../../../types/SelectOptionType";

export default function NewMovie() {
    let [genreOptions, setGenreOptions] = useState<SelectOptionType[]>();
    let [calendarState, setCalendarState] = useState<Range[]>([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
    let [isDatePickerOpened, setIsDatePickerOpened] = useState(false);
    let [formattedDateRange, setFormattedDateRange] = useState("");

    let [formData, setFormData] = useState<GeneralFormData>({
        title: "",
        language: "",
        startDate: "",
        endDate: "",
        director: "",
        pgRating: "",
        duration: "",
        genre: [],
        trailer: "",
        synopsis: ""
    });

    useEffect(() => {
        ApiService.get<Genre[]>("/genres")
            .then(genresResponse => {
                const genreOptions = genresResponse.map(genre => ({ value: genre.id, label: genre.name }))
                setGenreOptions(genreOptions);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [])
    return (
        <div className="add-movie-container">
            <div className="add-movie-heading">
                <h6 className="font-heading-h6">Add New Movie</h6>
                <button className="add-movie-cancel-btn">
                    <FontAwesomeIcon icon={faXmark} width={12} height={16} />
                </button>
            </div>
            <div className="add-movie-step-container">
                <div className="step-circle">1</div>
                <div className="add-movie-step-line"></div>
                <div className="step-circle">2</div>
                <div className="add-movie-step-line"></div>
                <div className="step-circle">3</div>
            </div>
            <div className="add-movie-step-labels font-lg-semibold">
                <p className="step-label">General</p>
                <p className="step-label">Details</p>
                <p className="step-label">Venues</p>
            </div>
            <GeneralForm />
            <ControlButtonGroup />
        </div>
    )
}