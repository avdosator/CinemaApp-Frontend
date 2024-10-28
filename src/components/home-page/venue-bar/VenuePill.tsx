import "./VenuePill.css";

type VenueButtonProps = {
    label: string;
};

export default function VenuePill({ label }: VenueButtonProps) {
    return (
        <div className="venue-pill">
            <span className="font-heading-h5">{label}</span>
        </div>
    );
}