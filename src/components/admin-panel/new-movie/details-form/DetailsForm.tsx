import { useState } from "react";
import "./DetailsForm.css"
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WritersContainer from "./writers-container/WritersContainer";
import CastContainer from "./cast-container/CastContainer";

export default function DetailsForm() {
    const [writersData, setWritersData] = useState<string[]>([]);
    const [castData, setCastData] = useState<string[]>([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 4,
    });

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

    const handleRemoveFile = (
        setter: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        setter([]);
    };

    return (
        <form className="details-form">
            <div className="writers-cast-container">
                {writersData.length > 0
                    ? (<WritersContainer writersData={writersData} />)
                    : (<>
                        <div className="upload-writers-container">
                            <div className="label-and-trash-icon-container">
                                <label htmlFor="" className="font-lg-semibold">Writers</label>
                                <button className="remove-csv-btn">
                                    <FontAwesomeIcon icon={faTrash} width={14} height={16} color="#D52D2D" />
                                </button>
                            </div>
                            <div className="file-input-container">
                                <input
                                    type="file"
                                    className="file-input"
                                    accept=".csv"
                                    onChange={(event) => handleFileParse(event, setWritersData)}
                                />
                            </div>
                        </div>
                    </>
                    )}


                {castData.length > 0
                    ? (<CastContainer castData={castData} />)
                    : (<>
                        <div className="upload-cast-container">
                            <div className="label-and-trash-icon-container">
                                <label htmlFor="" className="font-lg-semibold">Cast</label>
                                <button className="remove-csv-btn">
                                    <FontAwesomeIcon icon={faTrash} width={14} height={16} color="#D52D2D" />
                                </button>
                            </div>
                            <div className="file-input-container">
                                <input
                                    type="file"
                                    className="file-input"
                                    accept=".csv"
                                    onChange={(event) => handleFileParse(event, setCastData)}
                                />
                            </div>
                        </div>
                    </>
                    )}
            </div>

            <div>
                <label htmlFor="" className="font-lg-semibold upload-photos-label">Upload Photos</label>
                <div className="upload-photos-container" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="font-lg-underline-semibold photo-upload-btn">+ Upload Photos</p>
                    <p className="font-md-regular" style={{ marginBottom: "12px" }}>or just drag and drop</p>
                    <p className="font-sm-regular">* Add up to 4 photos</p>
                </div>
            </div>
        </form>
    )
}