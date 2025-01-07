import "./AdminPanelPage.css"
import { useState } from "react";
import SideBar from "./side-bar/SideBar";
import MoviesPanel from "./movies-tab/MoviesPanel";

export default function AdminPanelPage() {
    let [panel, setPanel] = useState<"movies" | "venues">("movies");

    return (
        <div className="admin-panel-page">
            <SideBar selectPanel={setPanel} activePanel={panel} />
            {panel === "movies" ? (<MoviesPanel />) : <></>}
        </div>
    )
}