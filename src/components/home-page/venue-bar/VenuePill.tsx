import "./VenuePill.css";

type VenueButtonProps = {
    label: string;
};

export default function VenuePill({ label }: VenueButtonProps) {
    return (
        <div className="venue-button">
            <span>{label}</span>
        </div>
    );
}