import PricingOption from "./PricingOption";
import "./PricingPage.css";

export default function PricingPage() {
    const pricingData = [
        {
            seatType: "Regular",
            price: 7,
            features: [
                "Comfortable seating",
                "Affordable pricing",
                "Wide selection",
                "Accessible locations",
                "Suitable for everyone",
            ],
        },
        {
            seatType: "Love",
            price: 24,
            features: [
                "Side-by-side design",
                "Comfortable padding",
                "Adjustable armrests",
                "Cup holders",
                "Reserved for couples",
            ],
        },
        {
            seatType: "VIP",
            price: 10,
            features: [
                "Enhanced comfort",
                "Priority seating",
                "Prime viewing",
                "Personal space",
                "Luxury extras",
            ],
        },
    ];

    return (
        <div className="pricing-page">
            <div className="pricing-header-section">
                <h4 className="font-heading-h4">Pricing</h4>
                <p>
                    Welcome to our cinema ticket pricing options! We offer three tiers to
                    suit everyone's preferences. Explore our pricing options below and treat
                    yourself to a cinematic adventure like never before!
                </p>
            </div>
            <div className="pricing-options">
                {pricingData.map((option, index) => (
                    <PricingOption
                        key={index}
                        seatType={option.seatType}
                        price={option.price}
                        features={option.features}
                    />
                ))}
            </div>
        </div>
    );
}
