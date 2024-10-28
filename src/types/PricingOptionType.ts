export type PricingOptionType = {
        seatType: string,
        price: number,
        features: string[]
}

export type PricingOptionProps = {
    option: PricingOptionType;
};