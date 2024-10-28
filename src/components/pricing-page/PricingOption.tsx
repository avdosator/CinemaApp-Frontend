import "./PricingOption.css"

type PricingOptionProps = {
    seatType: string,
    price: number,
    features: string[]
}

export default function PricingOption({ seatType, price, features }: PricingOptionProps) {
    const isLoveSeat = seatType === "Love";

    return (
        <div className={isLoveSeat ? "pricing-card love" : "pricing-card"}>
            <div className="pricing-card-header">
                <h6 className="pricing-type font-heading-h6">{seatType} Seats</h6>
                <h4 className="font-heading-h4 pricing-price">{price}</h4>
                <div className="font-lg-regular">*per ticket</div>
            </div>
            <div className="pricing-features-container">
                <ul className="pricing-features">
                    {features.map((feature, index) => (
                        <li className="pricing-feature font-lg-regular" key={index}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pricing-btn-container">
                <button className="explore-movies-btn">Explore Movies</button>
            </div>
        </div>
    );
}; 