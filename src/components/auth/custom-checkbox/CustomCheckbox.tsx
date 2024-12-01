import "./CustomCheckbox.css"

type CustomCheckboxProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
};

export default function CustomCheckbox({ checked, onChange }: CustomCheckboxProps) {

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked); // Notify the parent component
    };
    return (
        <div id="inputPreview">
            <input
                name="rememberMeCheck"
                id="rememberMeCheck"
                type="checkbox"
                className="css-checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
            />
            <label htmlFor="rememberMeCheck" className="font-lg-semibold " style={{ color: "#98A2B3" }}>Remember me</label>
        </div>
    )
}