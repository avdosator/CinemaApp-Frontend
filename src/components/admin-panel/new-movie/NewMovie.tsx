import SideBar from "../side-bar/SideBar";
import GeneralForm from "./general-form/GeneralForm";

export default function NewMovie() {
    return (
        <div style={{display:"flex"}}>
            <SideBar />
            <GeneralForm />
        </div>
    )
}