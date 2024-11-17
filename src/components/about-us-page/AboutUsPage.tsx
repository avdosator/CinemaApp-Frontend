import "./AboutUsPage.css"

export default function AboutUsPage() {
    window.scrollTo(0, 0);
    
    return (
        <div className="about-page">
            <div className="about-header">
                <h1 className="font-heading-h1">About Us</h1>
            </div>
            <section className="about-content">
                <div className="about-content-left"> 
                    <p className="font-heading-h5">About Our Dream.<br />Our History.<br />Cinema.</p>
                </div>
                <div className="about-content-right font-lg-regular"> 
                    <p>
                        Welcome to Cinebh, where movie magic comes to life.<br /> At Cinebh, we're not just about screening films;
                        we're passionate about creating unforgettable cinematic experiences. Since our establishment, we've
                        been dedicated to providing our audience with top-quality entertainment in a comfortable and welcoming environment.
                    </p>
                    <p>
                        Our state-of-the-art facilities boast the latest in audiovisual technology, ensuring that every movie
                        is presented with stunning clarity and immersive sound. From the latest blockbusters to timeless classics,
                        our diverse selection of films caters to every taste and preference.
                    </p>
                    <p>
                        As a hub for community entertainment, we take pride in being more than just a cinema.<br /> Join us at Cinebh
                        and discover why we're not just your average movie theater—we're your destination for cinematic excellence
                        and entertainment bliss.
                    </p>
                </div>
            </section>
            <div className="about-image">
                <img src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cinema seats" className="cinema-image" />
            </div>
        </div>
    )
}