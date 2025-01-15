import "./NewMovie.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneralForm from "./general-form/GeneralForm";
import ControlButtonGroup from "./control-button-group/ControlButtonGroup";
import { useState } from "react";
import { DetailsFormData, GeneralFormData, ProjectionsFormData } from "../../../types/FormData";
import DetailsForm from "./details-form/DetailsForm";
import ProjectionsForm from "./projections-form/ProjectionsForm";
import { useNavigate } from "react-router-dom";

type FormStep = 1 | 2 | 3;

export default function NewMovie() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<FormStep>(1); // Every step is new form

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
        setCurrentStep((prev) => Math.min(prev + 1, 3) as FormStep);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1) as FormStep);
    };

    // Validation Check Functions (Basic Example)
    const isGeneralFormComplete = Object.values(generalFormData).every(value => Array.isArray(value) ? value.length > 0 : !!value);
    const isDetailsFormComplete = detailsFormData.writersData.length > 0 && detailsFormData.castData.length > 0 && detailsFormData.uploadedPhotos.length > 0 && detailsFormData.coverPhotoIndex !== null;
    const isProjectionsFormComplete = projectionsFormData.every(group => group.city && group.venue && group.time);

    const stepStatus = (step: FormStep) => {
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
            <div className="add-movie-step-container font-heading-h6">
                {/* Step 1 */}
                <div className={`step-circle ${stepStatus(1)} ${isGeneralFormComplete ? "filled" : ""}`} >1</div>
                <div className={`add-movie-step-line ${stepStatus(1)}`}></div>

                {/* Step 2 */}
                <div className={`step-circle ${stepStatus(2)} ${isDetailsFormComplete ? "filled" : ""}`} >2</div>
                <div className={`add-movie-step-line ${stepStatus(2)}`}></div>

                {/* Step 3 */}
                <div className={`step-circle ${stepStatus(3)} ${isProjectionsFormComplete ? "filled" : ""}`} >3</div>
            </div>
            <div className="add-movie-step-labels font-lg-semibold">
                <p className="step-label" style={isGeneralFormComplete ? {color: "#1D2939"} : {}}>General</p>
                <p className="step-label" style={isDetailsFormComplete ? {color: "#1D2939"} : {}}>Details</p>
                <p className="step-label" style={isProjectionsFormComplete ? {color: "#1D2939"} : {}}>Venues</p>
            </div>

            {currentStep == 1 && (<GeneralForm generalFormData={generalFormData} setGeneralFormData={setGeneralFormData} />)}
            {currentStep === 2 && (<DetailsForm detailsFormData={detailsFormData} setDetailsFormData={setDetailsFormData} />)}
            {currentStep === 3 && (<ProjectionsForm projectionsFormData={projectionsFormData} setProjectionsFormData={setProjectionsFormData} />)}

            <ControlButtonGroup onNext={handleNextStep} onBack={handlePreviousStep} isBackDisabled={currentStep === 1} /></div>
    )
}