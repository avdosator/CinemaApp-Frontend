import "./NewMovie.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneralForm from "./general-form/GeneralForm";
import ControlButtonGroup from "./control-button-group/ControlButtonGroup";
import { useEffect, useState } from "react";
import { DetailsFormData, AddMovieFormStep, GeneralFormData, ProjectionsFormData } from "../../../types/FormData";
import DetailsForm from "./details-form/DetailsForm";
import ProjectionsForm from "./projections-form/ProjectionsForm";
import { useLocation, useNavigate } from "react-router-dom";
import AddMovieStepIndicator from "./add-movie-step-indicator/AddMovieStepIndicator";
import ApiService from "../../../service/ApiService";
import { buildMovieBody, checkConflictingProjections } from "../../../utils/utils";
import { Movie } from "../../../types/Movie";
import AddMoviePopUp from "./pop-up/AddMoviePopUp";
import axios from "axios";
import LoadingIndicator from "../../shared-components/loading-indicator/LoadingIndicator";
import DraftMoviePopUp from "./pop-up/DraftMoviePopUp";
import { format } from "date-fns";
import { SelectOptionType } from "../../../types/SelectOptionType";

const UPLOADCARE_PUBLIC_KEY = import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY;

export default function NewMovie() {
    const navigate = useNavigate();
    const location = useLocation();
    const movie: Movie | null = location.state?.movie || null;
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
        if (movie) {
            // Populate GeneralForm (always exists in all drafts)
            setGeneralFormData({
                title: movie.title,
                language: movie.language,
                startDate: format(new Date(movie.projections[0].startDate), "yyyy-MM-dd"),
                endDate: format(new Date(movie.projections[0].endDate), "yyyy-MM-dd"),
                director: movie.director,
                pgRating: movie.pgRating,
                duration: movie.durationInMinutes.toString(),
                genre: movie.genres.map(g => ({ value: g.id, label: g.name })),
                trailer: movie.trailerUrl,
                synopsis: movie.synopsis
            });

            // If it's draft-2 or draft-3, populate DetailsForm
            if (movie.status === "draft-2" || movie.status === "draft-3") {
                // Extract URLs from photos array
                const uploadedPhotoURLs = movie.photos.map(photo => photo.url) || [];

                // Find the index of the cover photo in the uploadedPhotoURLs array using coverPhotoId
                const coverPhotoIndex = movie.photos.findIndex(photo => photo.id === movie.coverPhotoId);

                setDetailsFormData({
                    writersData: movie.writers || [], // Ensure it's an array
                    castData: movie.actors || [], // Ensure it's an array
                    uploadedPhotos: [], // We can't populate File objects from backend
                    uploadedPhotoURLs: uploadedPhotoURLs,
                    coverPhotoIndex: coverPhotoIndex !== -1 ? coverPhotoIndex : null
                });
            }

            if (movie.status === "draft-3") {
                const projectionGroupsMap = new Map<string, ProjectionsFormData>();
            
                movie.projections.forEach(projection => {
                    const venueOption: SelectOptionType = {
                        value: projection.hall.venue.id,
                        label: projection.hall.venue.name
                    };
            
                    const cityOption: SelectOptionType = {
                        value: projection.hall.venue.city.id,
                        label: projection.hall.venue.city.name
                    };
            
                    // Extract unique times from projectionInstances
                    projection.projectionInstances.forEach(instance => {
                        const key = `${cityOption.value}-${venueOption.value}-${instance.time}`;
            
                        if (!projectionGroupsMap.has(key)) {
                            projectionGroupsMap.set(key, {
                                city: cityOption,
                                venue: venueOption,
                                time: instance.time
                            });
                        }
                    });
                });
            
                setProjectionsFormData(Array.from(projectionGroupsMap.values()));
            }
        }
    }, [movie]);

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
    const isDetailsFormComplete = detailsFormData.writersData.length > 0 && detailsFormData.castData.length > 0 && (detailsFormData.uploadedPhotos.length > 0 || detailsFormData.uploadedPhotoURLs.length > 0) && detailsFormData.coverPhotoIndex !== null;
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

        // If no new photos were uploaded, return the existing uploadedPhotoURLs
        if (detailsFormData.uploadedPhotos.length === 0) {
            return detailsFormData.uploadedPhotoURLs;
        }

        const uploadedPhotoUrls = await Promise.all(
            detailsFormData.uploadedPhotos.map(photo => uploadPhoto(photo).catch(() => null))
        ).then(results => results.filter(url => url !== null));

        if (uploadedPhotoUrls.length > 0) {
            setDetailsFormData((prev) => ({
                ...prev,
                uploadedPhotoURLs: [...prev.uploadedPhotoURLs, ...uploadedPhotoUrls], // Append new URLs to existing ones
                uploadedPhotos: [] // Clear local file uploads after successful upload
            }));
        } else {
            alert("Photo upload failed. Please try again.");
        }

        return uploadedPhotoUrls.length > 0 ? [...detailsFormData.uploadedPhotoURLs, ...uploadedPhotoUrls] : detailsFormData.uploadedPhotoURLs;
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

    const handleSaveDraft = async () => {
        let draftStatus = "";

        if (isGeneralFormComplete) draftStatus = "draft-1";
        if (isDetailsFormComplete) draftStatus = "draft-2";
        if (isProjectionsFormComplete) draftStatus = "draft-3";

        if (!draftStatus) {
            setDraftWarningModal({
                show: true,
                message: "You cannot save as a draft yet. Please complete at least Step 1.",
                continueAction: null, // No continue button, only close
            });
            return;
        }

        if ((currentStep === 2 && !isDetailsFormComplete) || (currentStep === 3 && !isProjectionsFormComplete)) {
            setDraftWarningModal({
                show: true,
                message: "If you save now, you will lose data from the current incomplete step.",
                continueAction: () => proceedSaveDraft(draftStatus), // Allow user to confirm save
            });
            return;
        }

        // Proceed without modal if everything is fine
        await proceedSaveDraft(draftStatus);
    };

    const proceedSaveDraft = async (draftStatus: string) => {
        try {
            setIsLoading(true);
            setDraftWarningModal({ show: false, message: "", continueAction: null });

            let uploadedPhotoUrls = detailsFormData.uploadedPhotoURLs;

            // If saving draft-2 or draft-3, ensure photos are uploaded
            if (draftStatus === "draft-2" || draftStatus === "draft-3") {
                uploadedPhotoUrls = await handleUploadPhotos();
                if (uploadedPhotoUrls.length === 0) {
                    alert("Photo upload failed. Please try again.");
                    setIsLoading(false);
                    return;
                }
            }

            // If saving draft-3, check for conflicting projections
            if (draftStatus === "draft-3" && checkConflictingProjections(projectionsFormData)) {
                setConflictingProjections(true);
                setIsLoading(false);
                return;
            }

            const createMovieBody = {
                ...(movie?.id && { movieId: movie.id }), // Send movieId only if editing
                ...buildMovieBody(
                    generalFormData,
                    { ...detailsFormData, uploadedPhotoURLs: uploadedPhotoUrls },
                    projectionsFormData
                ),
            };

            const jwt = localStorage.getItem("authToken");
            const headers = { "Authorization": `Bearer ${jwt}` };

            await ApiService.post<Movie>(`/movies?status=${draftStatus}`, createMovieBody, headers);

            setIsLoading(false);
            navigate("/admin/movies/drafts");
        } catch (error) {
            setIsLoading(false);
            console.error("Error saving draft:", error);
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