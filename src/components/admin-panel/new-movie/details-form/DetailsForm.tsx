import "./DetailsForm.css"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WritersContainer from "./writers-container/WritersContainer";
import CastContainer from "./cast-container/CastContainer";
import PhotosUpload from "./photos-upload/PhotosUpload";
import { DetailsFormData } from "../../../../types/FormData";
import Papa from "papaparse";

type DetailsFormProps = {
    detailsFormData: DetailsFormData,
    setDetailsFormData: React.Dispatch<React.SetStateAction<DetailsFormData>>
};

export default function DetailsForm({ detailsFormData, setDetailsFormData, }: DetailsFormProps) {

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
        <form className="details-form">
            <div className="writers-cast-container">
                <div className="upload-writers-container">
                    <div className="label-and-trash-icon-container">
                        <label htmlFor="" className="font-lg-semibold">Writers</label>
                        {isFileParsed(detailsFormData.writersData) && (
                            <button className="remove-csv-btn" type="button" onClick={() => handleRemoveFile("writersData")}>
                                <FontAwesomeIcon icon={faTrash} width={14} height={16} color="#D52D2D" />
                            </button>
                        )}
                    </div>
                    {isFileParsed(detailsFormData.writersData)
                        ? (<WritersContainer writersData={detailsFormData.writersData} />)
                        : (
                            <div className="file-input-container">
                                <input
                                    type="file"
                                    className="file-input"
                                    accept=".csv"
                                    onChange={(event) => handleFileParse(event, "writersData")}
                                />
                            </div>
                        )}
                </div>

                <div className="upload-cast-container">
                    <div className="label-and-trash-icon-container">
                        <label htmlFor="" className="font-lg-semibold">Cast</label>
                        {isFileParsed(detailsFormData.castData) && (
                            <button className="remove-csv-btn" type="button" onClick={() => handleRemoveFile("castData")}>
                                <FontAwesomeIcon icon={faTrash} width={14} height={16} color="#D52D2D" />
                            </button>
                        )}
                    </div>
                    {isFileParsed(detailsFormData.castData)
                        ? (<CastContainer castData={detailsFormData.castData} />)
                        : (
                            <div className="file-input-container">
                                <input
                                    type="file"
                                    className="file-input"
                                    accept=".csv"
                                    onChange={(event) => handleFileParse(event, "castData")}
                                />
                            </div>

                        )}
                </div>
            </div>
            <PhotosUpload detailsFormData={detailsFormData} setDetailsFormData={setDetailsFormData} />
        </form>
    )
}