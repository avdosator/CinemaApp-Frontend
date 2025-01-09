import "./MovieStatusBadge.css"

type MovieStatusBadgeProps = {
    statusType: "currently-showing" | "upcoming" | "drafts" | "archived";
    daysRemaining?: number;
    draftStep?: 1 | 2 | 3;
};

export default function MovieStatusBadge({ statusType, daysRemaining, draftStep }: MovieStatusBadgeProps) {

    const getStatusText = () => {
        switch (statusType) {
            case "currently-showing":
                return `Ending in ${daysRemaining} days`;
            case "upcoming":
                return `Coming in ${daysRemaining} days`;
            case "drafts":
                return `Step ${draftStep}/3 completed`;
            case "archived":
                return `Ended`;
        }
    };

    const getPillColor = () => {
        if (statusType === "drafts") {
            return draftStep === 3 ? "green-pill" : "yellow-pill";
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