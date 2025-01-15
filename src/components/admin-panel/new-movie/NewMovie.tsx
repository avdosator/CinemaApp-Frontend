import "./NewMovie.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneralForm from "./general-form/GeneralForm";
import ControlButtonGroup from "./control-button-group/ControlButtonGroup";
import { useState } from "react";
import { DetailsFormData, GeneralFormData, ProjectionsFormData } from "../../../types/FormData";
import DetailsForm from "./details-form/DetailsForm";
import ProjectionsForm from "./projections-form/ProjectionsForm";

type FormStep = 1 | 2 | 3;

export default function NewMovie() {
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
    const [errorMessages, setErrorMessages] = useState<{ [key: number]: string }>({});

    const handleProjectionsChange = (index: number, field: keyof ProjectionsFormData, value: any) => {
        setProjectionsFormData((prev) => {
            const updated = prev.map((group, i) =>
                i === index ? { ...group, [field]: value } : group
            );

            const { venue, time } = updated[index];
            const hasCollision = updated.some((group, i) =>
                i !== index && group.venue?.value === venue?.value && group.time === time
            );

            setErrorMessages(prev => {
                const newErrors = { ...prev };
                if (hasCollision) newErrors[index] = "Movie projection times cannot collide for the same venue";
                else delete newErrors[index];
                return newErrors;
            });

            return updated;
        });
    };

    const handleNextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3) as FormStep);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1) as FormStep);
    };

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

            {currentStep == 1 && (
                <GeneralForm
                    formData={generalFormData}
                    setFormData={setGeneralFormData}
                />
            )}
            {currentStep === 2 && (
                <DetailsForm
                    detailsFormData={detailsFormData}
                    setDetailsFormData={setDetailsFormData}
                />
            )}

            {currentStep === 3 && (
                <ProjectionsForm
                    projectionsFormData={projectionsFormData}
                    setProjectionsFormData={setProjectionsFormData}
                    errorMessages={errorMessages}
                    setErrorMessages={setErrorMessages}
                    onProjectionsChange={handleProjectionsChange}
                />
            )}

            <ControlButtonGroup
                onNext={handleNextStep}
                onBack={handlePreviousStep}
                isBackDisabled={currentStep === 1}
            />
        </div>
    )
}