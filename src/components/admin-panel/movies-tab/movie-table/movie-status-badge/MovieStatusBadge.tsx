import "./MovieStatusBadge.css"

type MovieStatusBadgeProps = {
    statusType: "currently-showing" | "upcoming" | "drafts" | "archived";
    daysRemaining?: number;
    draftStep?: 1 | 2 | 3;
};

export default function MovieStatusBadge({ statusType, daysRemaining, draftStep }: MovieStatusBadgeProps) {

}