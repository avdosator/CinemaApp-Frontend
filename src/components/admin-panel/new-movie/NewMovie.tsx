import "./NewMovie.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneralForm from "./general-form/GeneralForm";
import ControlButtonGroup from "./control-button-group/ControlButtonGroup";
import { useState, useEffect, useRef } from "react";
import ApiService from "../../../service/ApiService";
import { DetailsFormData, GeneralFormData } from "../../../types/FormData";
import { Genre } from "../../../types/Genre";
import { Range } from "react-date-range";
import { SelectOptionType } from "../../../types/SelectOptionType";
import DetailsForm from "./details-form/DetailsForm";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";

export default function NewMovie() {
    let [genreOptions, setGenreOptions] = useState<SelectOptionType[]>();
    let [calendarState, setCalendarState] = useState<Range[]>([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
    let [isDatePickerOpened, setIsDatePickerOpened] = useState(false);
    let [formattedDateRange, setFormattedDateRange] = useState("");

    let [generalFormData, setGeneralFormData] = useState<GeneralFormData>({
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
    const [detailsFormData, setDetailsFormData] = useState<DetailsFormData>({
        writersData: [],
        castData: [],
        uploadedPhotos: [],
        coverPhotoIndex: null
    });
    const placeholderRefs = Array(4).fill(null).map(() => useRef<HTMLInputElement>(null));

    useEffect(() => {
        ApiService.get<Genre[]>("/genres")
            .then(genresResponse => {
                const genreOptions = genresResponse.map(genre => ({ value: genre.id, label: genre.name }))
                setGenreOptions(genreOptions);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 4,
        onDrop: (acceptedFiles) => {
            if (detailsFormData.uploadedPhotos.length + acceptedFiles.length > 4) {
                alert("You can only upload up to 4 photos.");
                return;
            }
            setDetailsFormData((prev) => ({
                ...prev,
                uploadedPhotos: [...prev.uploadedPhotos, ...acceptedFiles]
            }));
        }
    });

    const handleRemovePhoto = (index: number) => {
        setDetailsFormData((prev) => ({
            ...prev,
            uploadedPhotos: prev.uploadedPhotos.filter((_, i) => i !== index),
            coverPhotoIndex: prev.coverPhotoIndex === index ? null : prev.coverPhotoIndex
        }));
    };

    const handleSetCoverPhoto = (index: number) => {
        setDetailsFormData((prev) => ({
            ...prev,
            coverPhotoIndex: index
        }));
    };

    const handleFileParse = (event: React.ChangeEvent<HTMLInputElement>, key: keyof DetailsFormData) => {
        const file = event.target.files?.[0];
        if (file && file.name.endsWith(".csv")) {
            Papa.parse(file, {
                header: false,
                complete: (result) => {
                    const parsedData = result.data.flat().filter(Boolean) as string[];
                    setDetailsFormData((prev) => ({
                        ...prev,
                        [key]: parsedData
                    }));
                },
                error: () => alert("Error parsing the CSV file.")
            });
        } else {
            alert("Please upload a valid CSV file.");
        }
    };

    const handleRemoveFile = (key: keyof DetailsFormData) => {
        setDetailsFormData((prev) => ({
            ...prev,
            [key]: []
        }));
    };

    const isFileParsed = (data: string[]): boolean => {
        return data.length > 0;
    }
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
            {/* <GeneralForm
                formData={formData}
                setFormData={setFormData}
                genreOptions={genreOptions!}
                calendarState={calendarState}
                setCalendarState={setCalendarState}
                isDatePickerOpened={isDatePickerOpened}
                setIsDatePickerOpened={setIsDatePickerOpened}
                formattedDateRange={formattedDateRange}
                setFormattedDateRange={setFormattedDateRange}
            /> */}
            <DetailsForm
                detailsFormData={detailsFormData}
                setDetailsFormData={setDetailsFormData}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                handleRemovePhoto={handleRemovePhoto}
                handleSetCoverPhoto={handleSetCoverPhoto}
                handleRemoveFile={handleRemoveFile}
                handleFileParse={handleFileParse}
                isFileParsed={isFileParsed}
                placeholderRefs={placeholderRefs}
            />
            <ControlButtonGroup />
        </div>
    )
}