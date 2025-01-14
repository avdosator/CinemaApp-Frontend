import "./DetailsForm.css"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WritersContainer from "./writers-container/WritersContainer";
import CastContainer from "./cast-container/CastContainer";
import PhotosUpload from "./photos-upload/PhotosUpload";

type DetailsFormProps = {
    writersData: string[],
    setWritersData: React.Dispatch<React.SetStateAction<string[]>>,
    castData: string[],
    setCastData: React.Dispatch<React.SetStateAction<string[]>>,
    uploadedPhotos: File[],
    setUploadedPhotos: React.Dispatch<React.SetStateAction<File[]>>,
    coverPhotoIndex: number | null,
    setCoverPhotoIndex: React.Dispatch<React.SetStateAction<number | null>>,
    getRootProps: () => any,
    getInputProps: () => any,
    handleRemovePhoto: (index: number) => void,
    handleSetCoverPhoto: (index: number) => void,
    handleRemoveFile: (setter: React.Dispatch<React.SetStateAction<string[]>>) => void,
    handleFileParse: (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string[]>>) => void,
    placeholderRefs: React.RefObject<HTMLInputElement>[],
    isFileParsed: (data: string[]) => boolean
};

export default function DetailsForm({
    writersData,
    setWritersData,
    castData,
    setCastData,
    uploadedPhotos,
    setUploadedPhotos,
    coverPhotoIndex,
    getRootProps,
    getInputProps,
    handleRemovePhoto,
    handleSetCoverPhoto,
    handleRemoveFile,
    handleFileParse,
    placeholderRefs,
    isFileParsed
}: DetailsFormProps) {

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
            <PhotosUpload
                uploadedPhotos={uploadedPhotos}
                setUploadedPhotos={setUploadedPhotos}
                coverPhotoIndex={coverPhotoIndex}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                handleRemovePhoto={handleRemovePhoto}
                handleSetCoverPhoto={handleSetCoverPhoto}
                placeholderRefs={placeholderRefs}
            />
        </form>
    )
}