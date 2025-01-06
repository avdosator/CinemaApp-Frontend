import "./ProjectionGroup.css"
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faClock, faLocationPin, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ProjectionsFormData } from "../../../../../types/FormData";
import { SelectOptionType } from "../../../../../types/SelectOptionType";

type ProjectionGroupProps = {
    formData: ProjectionsFormData;
    cityOptions: SelectOptionType[];
    venueOptions: SelectOptionType[];
    timeOptions: SelectOptionType[];
    onChange: (field: keyof ProjectionsFormData, value: any) => void;
    onDelete: () => void;
    isFirst: boolean
};

export default function ProjectionGroup({
    formData,
    cityOptions,
    venueOptions,
    timeOptions,
    onChange,
    onDelete,
    isFirst
}: ProjectionGroupProps) {

    const isAllSelected = formData.city && formData.venue && formData.time;

    const handleTrashClick = () => {
        if (isFirst && isAllSelected) {
            onChange("city", null);
            onChange("venue", null);
            onChange("time", "");
        } else {
            onDelete();
        }
    };

    return (
        <div className="add-projection-select-group">
            {/* City Select */}
            <div className="add-projection-input-group">
                <label htmlFor="city" className="font-lg-semibold">City</label>
                <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLocationPin} className={`input-icon ${formData.city ? "red-icon" : ""}`} id="locationIcon" />
                    <Select<SelectOptionType>
                        options={cityOptions}
                        placeholder="Choose city"
                        className="dropdown-menu-input"
                        classNamePrefix="dropdown"
                        isClearable
                        value={formData.city}
                        onChange={(newValue) => onChange("city", newValue)}
                    />
                </div>
            </div>

            {/* Venue Select */}
            <div className="add-projection-input-group">
                <label htmlFor="venue" className="font-lg-semibold">Venue</label>
                <div className="input-wrapper">
                    <FontAwesomeIcon icon={faBuilding} className={`input-icon ${formData.venue ? "red-icon" : ""}`} id="buildingIcon" />
                    <Select<SelectOptionType>
                        options={venueOptions}
                        placeholder="Choose venue"
                        className="dropdown-menu-input"
                        classNamePrefix="dropdown"
                        isClearable
                        value={formData.venue}
                        onChange={(newValue) => onChange("venue", newValue)}
                    />
                </div>
            </div>

            {/* Time Select */}
            <div className="add-projection-input-group">
                <label htmlFor="time" className="font-lg-semibold">Projection Time</label>
                <div className="input-wrapper">
                    <FontAwesomeIcon icon={faClock} className={`input-icon ${formData.time ? "red-icon" : ""}`} id="clockIcon" />
                    <Select<SelectOptionType, false>
                        options={timeOptions}
                        placeholder="Choose time"
                        className="dropdown-menu-input"
                        classNamePrefix="dropdown"
                        isClearable
                        value={timeOptions.find(option => option.value === formData.time)}
                        onChange={(newValue) => onChange("time", newValue?.value)}
                    />
                </div>
            </div>

            {/* Delete Button */}
            <button
                className={`projection-form-trash-btn ${isFirst && !isAllSelected ? "trash-btn-disabled" : "trash-btn-enabled"}`}
                onClick={handleTrashClick}
                disabled={isFirst && !isAllSelected}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )
}
