import "./ProjectionsForm.css"
import "../general-form/GeneralForm.css"
import { useEffect, useState } from "react";
import { SelectOptionType } from "../../../../types/SelectOptionType";
import ApiService from "../../../../service/ApiService";
import { City } from "../../../../types/City";
import { PageResponse } from "../../../../types/PageResponse";
import { Venue } from "../../../../types/Venue";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectionsFormData } from "../../../../types/FormData";
import ProjectionGroup from "./projection-group/ProjectionGroup";

type ProjectionsFormProps = {
    projectionsFormData: ProjectionsFormData[],
    setProjectionsFormData: React.Dispatch<React.SetStateAction<ProjectionsFormData[]>>,
};

export default function ProjectionsForm({ projectionsFormData, setProjectionsFormData, }: ProjectionsFormProps) {
    let [cityOptions, setCityOptions] = useState<SelectOptionType[]>([]);
    let [venueOptions, setVenueOptions] = useState<SelectOptionType[]>([]);
    let [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
    const [errorMessages, setErrorMessages] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        Promise.all([
            ApiService.get<City[]>("/cities"),
            ApiService.get<PageResponse<Venue>>("/venues"),
        ])
            .then(([citiesResponse, venuesResponse]) => {
                const cityOptions = citiesResponse.map(city => ({ value: city.id, label: city.name }));
                setCityOptions(cityOptions);
                const venueOptions = venuesResponse.content.map(venue => ({ value: venue.id, label: venue.name }));
                setVenueOptions(venueOptions);
            })
    }, []);

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

    const handleDeleteGroup = (index: number) => {
        setProjectionsFormData(prevProjections =>
            prevProjections.filter((_, i) => i !== index)
        );

        setErrorMessages(prev => {
            const newErrors = { ...prev };
            delete newErrors[index];
            return newErrors;
        });
    };

    const handleAddProjectionGroup = () => {
        setProjectionsFormData(prev => [...prev, { city: null, venue: null, time: "" }]);
    };

    const isLastGroupFilled = () => {
        const lastGroup = projectionsFormData[projectionsFormData.length - 1];
        return lastGroup.city && lastGroup.venue && lastGroup.time;
    };

    const askForDeletion = (index: number) => {
        setIsModalVisible(true);
        setGroupToDelete(index);
    };

    const confirmDeletion = () => {
        if (groupToDelete !== null) {
            handleDeleteGroup(groupToDelete);
            setGroupToDelete(null);
            setIsModalVisible(false);
        }
    };

    return (
        <>
            {isModalVisible && (
                <div className="session-expired-overlay">
                    <div className="session-expired-modal">
                        <h6 className="font-heading-h6" style={{ color: "#101828" }}>Delete Projection</h6>
                        <p className="font-md-regular" style={{ color: "#667085" }}>
                            Are you sure you want to delete this projection?
                        </p>
                        <div className="session-expired-footer" style={{ gap: "8px" }}>
                            <button className="font-sm-semibold payment-back-to-home-btn" onClick={() => setIsModalVisible(false)}>
                                Cancel
                            </button>
                            <button className="font-sm-semibold new-bank-card-btn" style={{ width: "auto" }} onClick={confirmDeletion}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <form className="projections-form">

                {projectionsFormData.map((group, index) => (
                    <ProjectionGroup
                        key={index}
                        formData={group}
                        cityOptions={cityOptions}
                        venueOptions={venueOptions}
                        onChange={(field, value) => handleProjectionsChange(index, field, value)}
                        onDelete={() => askForDeletion(index)}
                        errorMessage={errorMessages[index]}
                        isOnly={projectionsFormData.length === 1}
                    />
                ))}
                <button
                    className="projection-form-add-btn"
                    onClick={handleAddProjectionGroup}
                    disabled={!isLastGroupFilled()}
                    type="button"
                >
                    <FontAwesomeIcon icon={faPlus} height={24} />
                    <span className="font-lg-underline-semibold">Add Projection</span>
                </button>
            </form>
        </>
    )
}