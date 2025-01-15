import "./NewMovie.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneralForm from "./general-form/GeneralForm";
import ControlButtonGroup from "./control-button-group/ControlButtonGroup";
import { useState } from "react";
import { DetailsFormData, AddMovieFormStep, GeneralFormData, ProjectionsFormData } from "../../../types/FormData";
import DetailsForm from "./details-form/DetailsForm";
import ProjectionsForm from "./projections-form/ProjectionsForm";
import { useNavigate } from "react-router-dom";
import AddMovieStepIndicator from "./add-movie-step-indicator/AddMovieStepIndicator";

export default function NewMovie() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<AddMovieFormStep>(1); // Every step is new form

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
        coverPhotoIndex: null
    });

    // ProjectionsForm state
    const [projectionsFormData, setProjectionsFormData] = useState<ProjectionsFormData[]>([
        { city: null, venue: null, time: "" }
    ]);

    const handleNextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3) as AddMovieFormStep);
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

    return (
        <div className="add-movie-container">
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

            <ControlButtonGroup onNext={handleNextStep} onBack={handlePreviousStep} isBackDisabled={currentStep === 1} /></div>
    )
}