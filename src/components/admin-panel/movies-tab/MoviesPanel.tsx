import { useEffect, useRef, useState } from "react";
import "./MoviesPanel.css"
import NoMoviesAdded from "./no-movies-added/NoMoviesAdded"

export default function MoviesPanel() {
    const [activeTab, setActiveTab] = useState<"drafts" | "currentlyShowing" | "upcoming" | "archived">("drafts");

    const tabs: { id: "drafts" | "currentlyShowing" | "upcoming" | "archived"; label: string }[] = [
        { id: "drafts", label: "Drafts (0)" },
        { id: "currentlyShowing", label: "Currently Showing (0)" },
        { id: "upcoming", label: "Upcoming (0)" },
        { id: "archived", label: "Archived (0)" }
    ];

    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [underlineStyle, setUnderlineStyle] = useState({ width: "0px", transform: "translateX(0px)" });

    useEffect(() => {
        const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
        const activeTabElement = tabRefs.current[activeIndex];
        if (activeTabElement) {
            setUnderlineStyle({
                width: `${activeTabElement.offsetWidth}px`,
                transform: `translateX(${activeTabElement.offsetLeft}px)`
            });
        }
    }, [activeTab]);

    return (
        <div className="movies-panel">
            <div className="movie-panel-heading-container">
                <div>
                    <h6 className="font-heading-h6" style={{ color: "#1D2939", marginBottom: "10px" }}>Movies</h6>
                    <div className="movie-tabs-container">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                ref={(el) => (tabRefs.current[index] = el)}
                                className={`movie-tab ${activeTab === tab.id ? "font-lg-semibold" : "font-lg-regular"}`}
                                onClick={() => setActiveTab(tab.id)}
                                style={{ color: activeTab === tab.id ? "#B22222" : "#1D2939" }}
                            >
                                {tab.label}
                            </button>
                        ))}
                        <div className="tab-highlight" style={underlineStyle}></div>
                    </div>

                </div>
                <button className="add-movie-btn font-lg-semibold" id="addMovieBtn1">Add Movie</button>
            </div>
            <NoMoviesAdded />
        </div>
    )
}