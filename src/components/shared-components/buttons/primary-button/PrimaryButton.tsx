type PrimaryButtonProps = {
    label: string
}

export default function PrimaryButton({label} : PrimaryButtonProps) {
    return (
        <button className="font-lg-semibold">
            {label}
        </button>
    );
}