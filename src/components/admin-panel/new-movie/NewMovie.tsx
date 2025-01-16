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
import ApiService from "../../../service/ApiService";
import { buildMovieBody } from "../../../utils/utils";
import { Movie } from "../../../types/Movie";

export default function NewMovie() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<AddMovieFormStep>(1);
    const [formNotFilledModal, setFormNotFilledModal] = useState<boolean>(false); // Every step is new form

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

    function createMovie(): void {
        const createMovieBody = buildMovieBody(generalFormData, detailsFormData, projectionsFormData);
        console.log(createMovieBody);
        try {
            ApiService.post<Movie>("/movies", createMovieBody)
                .then(response => console.log("we got response: ", response));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="add-movie-container">
            {formNotFilledModal && (
                <div className="session-expired-overlay">
                    <div className="session-expired-modal">
                        <h6 className="font-heading-h6" style={{ color: "#101828" }}>Form not completed</h6>
                        <p className="font-md-regular" style={{ color: "#667085" }}> Please complete all required fields before proceeding.</p>
                        <div className="session-expired-footer" style={{ gap: "8px" }}>
                            <button className="font-sm-semibold new-bank-card-btn" style={{ width: "auto" }} onClick={() => setFormNotFilledModal(false)}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
                onSubmit={() => createMovie()} // Replace with actual submit logic
            />
        </div>
    )
}