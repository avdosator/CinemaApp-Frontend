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

const timeOptions = Array.from({ length: 16 }, (_, i) => {
    const hours = (8 + i).toString().padStart(2, "0");
    return { value: `${hours}:00`, label: `${hours}:00` };
});

export default function ProjectionsForm() {
    let [cityOptions, setCityOptions] = useState<SelectOptionType[]>([]);
    let [venueOptions, setVenueOptions] = useState<SelectOptionType[]>([]);
    const [projections, setProjections] = useState<ProjectionsFormData[]>([
        { city: null, venue: null, time: "" }
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState<number | null>(null);

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

    const handleGroupChange = (index: number, field: keyof ProjectionsFormData, value: any) => {
        setProjections(prevProjections =>
            prevProjections.map((group, i) =>
                i === index ? { ...group, [field]: value } : group
            )
        );
    };

    const handleDeleteGroupClick = (index: number) => {
        setProjections(prevProjections =>
            prevProjections.map((group, i) =>
                i === index ? { city: null, venue: null, time: "" } : group
            )
        );
    };

    const confirmDelete = () => {
        if (!modalVisible || groupToDelete === null) return;
        
        // Close the modal first before deleting
        setModalVisible(false);
    
        // Perform the deletion after the modal closes to prevent re-render conflict
        setTimeout(() => {
            setProjections(prevProjections => prevProjections.filter((_, i) => i !== groupToDelete));
            setGroupToDelete(null);
        }, 0);
    };


    const handleAddProjectionGroup = () => {
        setProjections(prevProjections => [
            ...prevProjections,
            { city: null, venue: null, time: "" }
        ]);
    };

    const isLastGroupFilled = () => {
        const lastGroup = projections[projections.length - 1];
        return lastGroup.city && lastGroup.venue && lastGroup.time;
    };

    return (
        <>
            {modalVisible && groupToDelete !== null && (
                <div className="session-expired-overlay">
                    <div className="session-expired-modal">
                        <h6 className="font-heading-h6" style={{ color: "#101828" }}>Delete Projection</h6>
                        <p className="font-md-regular" style={{ color: "#667085" }}>
                            Are you sure you want to delete this projection?
                        </p>
                        <div className="session-expired-footer" style={{ gap: "8px" }}>
                            <button className="font-sm-semibold payment-back-to-home-btn" onClick={() => setModalVisible(false)}>
                                Cancel
                            </button>
                            <button className="font-sm-semibold new-bank-card-btn" style={{ width: "auto" }} onClick={confirmDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <form className="projections-form">
                {projections.map((group, index) => (
                    <ProjectionGroup
                        key={index}
                        formData={group}
                        cityOptions={cityOptions}
                        venueOptions={venueOptions}
                        timeOptions={timeOptions}
                        onChange={(field, value) => handleGroupChange(index, field, value)}
                        onDelete={() => handleDeleteGroupClick(index)}
                        isFirst={index === 0}
                    />
                ))}
                <button
                    className="projection-form-add-btn"
                    onClick={handleAddProjectionGroup}
                    disabled={!isLastGroupFilled()}
                    style={isLastGroupFilled() ? { color: "#B22222" } : { color: "#D0D5DD" }}
                    type="button"
                >
                    <FontAwesomeIcon icon={faPlus} height={24} />
                    <span className="font-lg-underline-semibold">Add Projection</span>
                </button>
            </form>
        </>
    )
}