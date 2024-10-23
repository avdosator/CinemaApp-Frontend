import "./Header.css"

export default function Header() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="navbar-logo">
                        <div className="logo-container">
                            <div className="logo-icon">
                                <img src="https://placehold.co/26x24" alt="Cinebh Icon" />
                            </div>
                            <div className="logo-text">Cinebh.</div>
                        </div>
                    </div>
                    <div className="navbar-links">
                        <a href="#" className="navbar-item active">Currently Showing</a>
                        <a href="#" className="navbar-item">Upcoming Movies</a>
                        <a href="#" className="navbar-item">Venues</a>
                    </div>
                    <div className="navbar-actions">

                    </div>
                </div>
            </nav>
        </>
    )
}