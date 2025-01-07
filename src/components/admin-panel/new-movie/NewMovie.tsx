import SideBar from "../side-bar/SideBar";
import ProjectionsForm from "./projections-form/ProjectionsForm";

export default function NewMovie() {
    return (
        <div style={{display:"flex"}}>
            <SideBar />
            <ProjectionsForm />
        </div>
    )
}