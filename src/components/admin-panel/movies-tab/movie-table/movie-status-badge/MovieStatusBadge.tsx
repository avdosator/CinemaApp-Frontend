import { MovieTabType } from "../../../../../types/MovieTabType";
import "./MovieStatusBadge.css"

type MovieStatusBadgeProps = {
    statusType: MovieTabType,
    daysRemaining?: number,
    draftStep?: string
};

export default function MovieStatusBadge({ statusType, daysRemaining, draftStep }: MovieStatusBadgeProps) {

    const getStatusText = () => {
        switch (statusType) {
            case "currently-showing":
                return daysRemaining === 1 ? `Ending in ${daysRemaining} day` : `Ending in ${daysRemaining} days`;
            case "upcoming":
                return daysRemaining === 1 ? `Coming in ${daysRemaining} day` : `Ending in ${daysRemaining} days`;
            case "drafts":
                if (draftStep === "draft-1") return "Step 1/3";
                if (draftStep === "draft-2") return "Step 2/3";
                if (draftStep === "draft-3") return "Step 3/3";
                return "Draft"; // Fallback for undefined draftStep
            case "archived":
                return `Ended`;
        }
    };

    const getPillColor = () => {
        if (statusType === "drafts") {
            return draftStep === "draft-3" ? "green-pill" : "yellow-pill";
        }
        if (statusType === "archived") {
            return "red-pill";
        }
        return daysRemaining && daysRemaining >= 7 ? "green-pill" : "yellow-pill";
    };

    return (
        <span className={`font-medium-regular movie-status-badge ${getPillColor()}`}>
            {getStatusText()}
        </span>
    );
}