type PricingOptionProps = {
    seatType: string,
    price: number,
    features: string[]
}

export default function PricingOption({ seatType, price, features }: PricingOptionProps) {
    return (
        <div className="pricing-card">
            <div className="pricing-card-header">
                <h6 className="pricing-type">{seatType}</h6>
                <div className="pricing-price">{price}</div>
                <span>*per ticket</span>
            </div>
            <div>
                <ul className="pricing-features">
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
            <div className="pricing-btn-container">
                <button className="explore-movies-btn">Explore Movies</button>
            </div>
        </div>
    );
};