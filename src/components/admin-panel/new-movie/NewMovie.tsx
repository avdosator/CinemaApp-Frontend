import SideBar from "../side-bar/SideBar";
import DetailsForm from "./details-form/DetailsForm";

export default function NewMovie() {
    return (
        <div style={{display:"flex"}}>
            <SideBar />
            <DetailsForm />
        </div>
    )
}