import { useState } from "react";
import "./DetailsForm.css"
import Papa from "papaparse";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WritersContainer from "./writers-container/WritersContainer";
import CastContainer from "./cast-container/CastContainer";
import PhotosUpload from "./photos-upload/PhotosUpload";

export default function DetailsForm() {
    const [writersData, setWritersData] = useState<string[]>([]);
    const [castData, setCastData] = useState<string[]>([]);


    const handleFileParse = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        const file = event.target.files?.[0];
        if (file && file.name.endsWith(".csv")) {
            Papa.parse(file, {
                header: false,
                complete: (result) => {
                    const parsedData = result.data.flat().filter(Boolean) as string[];
                    setter(parsedData);
                },
                error: () => alert("Error parsing the CSV file.")
            });
        } else {
            alert("Please upload a valid CSV file.");
        }
    };

    const handleRemoveFile = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter([]);
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
                        {isFileParsed(writersData) && (
                            <button className="remove-csv-btn" type="button" onClick={() => handleRemoveFile(setWritersData)}>
                                <FontAwesomeIcon icon={faTrash} width={14} height={16} color="#D52D2D" />
                            </button>
                        )}
                    </div>
                    {isFileParsed(writersData)
                        ? (<WritersContainer writersData={writersData} />)
                        : (
                            <div className="file-input-container">
                                <input
                                    type="file"
                                    className="file-input"
                                    accept=".csv"
                                    onChange={(event) => handleFileParse(event, setWritersData)}
                                />
                            </div>
                        )}
                </div>

                <div className="upload-cast-container">
                    <div className="label-and-trash-icon-container">
                        <label htmlFor="" className="font-lg-semibold">Cast</label>
                        {isFileParsed(castData) && (
                            <button className="remove-csv-btn" type="button" onClick={() => handleRemoveFile(setCastData)}>
                                <FontAwesomeIcon icon={faTrash} width={14} height={16} color="#D52D2D" />
                            </button>
                        )}
                    </div>
                    {isFileParsed(castData)
                        ? (<CastContainer castData={castData} />)
                        : (
                            <div className="file-input-container">
                                <input
                                    type="file"
                                    className="file-input"
                                    accept=".csv"
                                    onChange={(event) => handleFileParse(event, setCastData)}
                                />
                            </div>

                        )}
                </div>
            </div>
            <PhotosUpload />
        </form>
    )
}