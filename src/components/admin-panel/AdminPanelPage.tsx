import "./AdminPanelPage.css"
import { useState } from "react";
import SideBar from "./side-bar/SideBar";
import MoviesPanel from "./movies-tab/MoviesPanel";

export default function AdminPanelPage() {
    let [panel, setTPanel] = useState<"movies" | "venues">("movies");

    return (
        <div className="admin-panel-page">
            <SideBar />
            {panel === "movies" ? (<MoviesPanel />) : <></>}
        </div>
    )
}