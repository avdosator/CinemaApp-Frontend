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
import TertiaryButton from "../../../shared-components/buttons/tertiary-button/TertiaryButton";
import DeleteProjectionPopup from "../../../shared-components/pop-up/delete-projection-pop-up/DeleteProjectionPopup";

type ProjectionsFormProps = {
    projectionsFormData: ProjectionsFormData[],
    setProjectionsFormData: React.Dispatch<React.SetStateAction<ProjectionsFormData[]>>,
};

export default function ProjectionsForm({ projectionsFormData, setProjectionsFormData, }: ProjectionsFormProps) {
    let [cityOptions, setCityOptions] = useState<SelectOptionType[]>([]);
    const [allVenues, setAllVenues] = useState<Venue[]>([]); // Stores all venues for filtering
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
                setAllVenues(venuesResponse.content);
            })
    }, []);

    const filterVenuesByCity = (cityId: string | null): SelectOptionType[] => {
        if (!cityId) return [];
        return allVenues
            .filter(venue => venue.city.id.toString() === cityId)
            .map(venue => ({ value: venue.id, label: venue.name }));
    };


    const handleProjectionsChange = (index: number, field: keyof ProjectionsFormData, value: any) => {
        setProjectionsFormData((prev) => {
            const updated = prev.map((group, i) =>
                i === index ? { ...group, [field]: value } : group
            );

            if (field === "city") {
                updated[index].venue = null; // Reset venue selection if city changes
            }

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
                <DeleteProjectionPopup
                    heading="Delete Projection"
                    text="Are you sure you want to delete this projection?"
                    cancelAction={() => setIsModalVisible(false)}
                    deleteAction={confirmDeletion}
                />
            )}

            <form className="projections-form">
                {projectionsFormData.map((group, index) => (
                    <ProjectionGroup
                        key={index}
                        formData={group}
                        cityOptions={cityOptions}
                        venueOptions={filterVenuesByCity(group.city?.value ?? null)}
                        onChange={(field, value) => handleProjectionsChange(index, field, value)}
                        onDelete={() => askForDeletion(index)}
                        errorMessage={errorMessages[index]}
                        isOnly={projectionsFormData.length === 1}
                    />
                ))}
                <TertiaryButton
                    label="Add Projection"
                    size="large"
                    onClick={handleAddProjectionGroup}
                    isDisabled={!isLastGroupFilled()}
                    icon={<FontAwesomeIcon icon={faPlus} height={24} />}
                    style={{ display: "block", margin: "0 auto", marginTop: "32px" }}
                />
            </form>
        </>
    )
}