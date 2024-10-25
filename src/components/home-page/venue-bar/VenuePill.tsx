import "./VenuePill.css";

type VenueButtonProps = {
    label: string;
};

export default function VenuePill({ label }: VenueButtonProps) {
    return (
        <div className="venue-pill">
            <span>{label}</span>
        </div>
    );
}