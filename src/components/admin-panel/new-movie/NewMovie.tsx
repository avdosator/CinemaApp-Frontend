import "./NewMovie.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneralForm from "./general-form/GeneralForm";
import ControlButtonGroup from "./control-button-group/ControlButtonGroup";
import { useEffect, useState } from "react";
import { DetailsFormData, AddMovieFormStep, GeneralFormData, ProjectionsFormData } from "../../../types/FormData";
import DetailsForm from "./details-form/DetailsForm";
import ProjectionsForm from "./projections-form/ProjectionsForm";
import { useNavigate } from "react-router-dom";
import AddMovieStepIndicator from "./add-movie-step-indicator/AddMovieStepIndicator";
import ApiService from "../../../service/ApiService";
import { buildMovieBody, checkConflictingProjections } from "../../../utils/utils";
import { Movie } from "../../../types/Movie";
import AddMoviePopUp from "./pop-up/AddMoviePopUp";
import axios from "axios";
import LoadingIndicator from "../../shared-components/loading-indicator/LoadingIndicator";
import DraftMoviePopUp from "./pop-up/DraftMoviePopUp";

const UPLOADCARE_PUBLIC_KEY = import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY;

export default function NewMovie() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<AddMovieFormStep>(1);
    const [formNotFilledModal, setFormNotFilledModal] = useState<boolean>(false); // Every step is new form
    const [conflictingProjections, setConflictingProjections] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [draftWarningModal, setDraftWarningModal] = useState<{
        show: boolean;
        message: string;
        continueAction: (() => void) | null;
    }>({ show: false, message: "", continueAction: null });

    // GeneralForm state 
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

    // DetailsForm state
    const [detailsFormData, setDetailsFormData] = useState<DetailsFormData>({
        writersData: [],
        castData: [],
        uploadedPhotos: [],
        uploadedPhotoURLs: [],
        coverPhotoIndex: null
    });

    // ProjectionsForm state
    const [projectionsFormData, setProjectionsFormData] = useState<ProjectionsFormData[]>([
        { city: null, venue: null, time: "" }
    ]);

    useEffect(() => {
        checkConflictingProjections(projectionsFormData);
    }, [projectionsFormData]);

    const handleNextStep = () => {
        if (validateCurrentStep()) {
            setCurrentStep((prev) => Math.min(prev + 1, 3) as AddMovieFormStep);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1) as AddMovieFormStep);
    };

    // Validation Check Functions (Basic Example)
    const isGeneralFormComplete = Object.values(generalFormData).every(value => Array.isArray(value) ? value.length > 0 : !!value);
    const isDetailsFormComplete = detailsFormData.writersData.length > 0 && detailsFormData.castData.length > 0 && detailsFormData.uploadedPhotos.length > 0 && detailsFormData.coverPhotoIndex !== null;
    const isProjectionsFormComplete = projectionsFormData.every(group => group.city && group.venue && group.time);

    const stepStatus = (step: AddMovieFormStep) => {
        if (step < currentStep) return "completed";
        if (step === currentStep) return "active";
        return "inactive";
    };

    const validateCurrentStep = () => {
        if (
            (currentStep === 1 && !isGeneralFormComplete) ||
            (currentStep === 2 && !isDetailsFormComplete) ||
            (currentStep === 3 && !isProjectionsFormComplete)
        ) {
            setFormNotFilledModal(true);
            return false;
        }
        return true;
    };

    const uploadPhoto = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("UPLOADCARE_PUB_KEY", UPLOADCARE_PUBLIC_KEY);

        try {
            const response = await axios.post("https://upload.uploadcare.com/base/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return `https://ucarecdn.com/${response.data.file}/`;
        } catch (error) {
            console.error(`Error uploading file ${file.name}:`, error);
            throw error;
        }
    };

    const handleUploadPhotos = async (): Promise<string[]> => {
        const uploadedPhotoUrls = await Promise.all(
            detailsFormData.uploadedPhotos.map(photo => uploadPhoto(photo).catch(() => null))
        ).then(results => results.filter(url => url !== null));

        if (uploadedPhotoUrls.length > 0) {
            setDetailsFormData((prev) => ({
                ...prev,
                uploadedPhotoURLs: uploadedPhotoUrls,
            }));
        } else {
            alert("Photo upload failed. Please try again.");
        }

        return uploadedPhotoUrls;
    };

    const handleAddMovie = async () => {
        if (checkConflictingProjections(projectionsFormData)) {
            setConflictingProjections(true); // Show the popup
            return;
        }

        try {
            setIsLoading(true);
            // Step 1: Upload photos and wait for completion
            const uploadedPhotoUrls = await handleUploadPhotos();

            // Step 3: Check if uploadedPhotoURLs and coverPhotoIndex are correctly set
            if (uploadedPhotoUrls.length === 0 || detailsFormData.coverPhotoIndex === null) {
                alert("Please upload photos and select a cover photo.");
                return;
            }

            // Step 3: Build the request body with updated detailsFormData
            const createMovieBody = buildMovieBody(
                generalFormData,
                { ...detailsFormData, uploadedPhotoURLs: uploadedPhotoUrls },
                projectionsFormData
            );
            const jwt = localStorage.getItem("authToken");
            const headers = { "Authorization": `Bearer ${jwt}` };

            // Step 4: Send the request to the backend
            await ApiService.post<Movie>("/movies?status=active", createMovieBody, headers);
            setIsLoading(false);
            navigate("/admin/movies/upcoming");
        } catch (error) {
            setIsLoading(false);
            console.error("Error adding movie:", error);
        }
    };

    return (
        <div className="add-movie-container">
            {formNotFilledModal && (
                <AddMoviePopUp heading="Form Not Completed" text="Please complete all required fields before proceeding."
                    okayAction={setFormNotFilledModal}
                />
            )}
            {conflictingProjections && (
                <AddMoviePopUp heading="Movie Cannot be Added" text="Movie that has conflicting projection time cannot be added."
                    okayAction={setConflictingProjections}
                />
            )}

            {draftWarningModal.show && (
                <DraftMoviePopUp
                    message={draftWarningModal.message}
                    onConfirm={draftWarningModal.continueAction ? draftWarningModal.continueAction : undefined}
                    onCancel={() => setDraftWarningModal({ show: false, message: "", continueAction: null })}
                    cancelButtonText={draftWarningModal.continueAction ? "Cancel" : "OK"}
                />
            )}

            {isLoading
                ? (<LoadingIndicator />)
                : (
                    <>
                        <div className="add-movie-heading">
                            <h6 className="font-heading-h6">Add New Movie</h6>
                            <button className="add-movie-cancel-btn" onClick={() => navigate("/admin")}>
                                <FontAwesomeIcon icon={faXmark} width={12} height={16} />
                            </button>
                        </div>
                        <AddMovieStepIndicator
                            isGeneralFormComplete={isGeneralFormComplete}
                            isDetailsFormComplete={isDetailsFormComplete}
                            isProjectionsFormComplete={isProjectionsFormComplete}
                            stepStatus={stepStatus}
                        />
                        {currentStep == 1 && (<GeneralForm generalFormData={generalFormData} setGeneralFormData={setGeneralFormData} />)}
                        {currentStep === 2 && (<DetailsForm detailsFormData={detailsFormData} setDetailsFormData={setDetailsFormData} />)}
                        {currentStep === 3 && (<ProjectionsForm projectionsFormData={projectionsFormData} setProjectionsFormData={setProjectionsFormData} />)}

                        <ControlButtonGroup
                            onNext={handleNextStep}
                            onBack={handlePreviousStep}
                            isBackDisabled={currentStep === 1}
                            isFinalStep={currentStep === 3}
                            isFormComplete={isProjectionsFormComplete && isDetailsFormComplete && isGeneralFormComplete}
                            handleAddMovie={handleAddMovie}
                            handleSaveDraft={handleSaveDraft}
                        />
                    </>
                )}


        </div>
    )
}