type VipSeatProps = {
    number: string,
}

export default function VipSeat({number}: VipSeatProps) {
    return (
        <button>
            {number}
        </button>
    )
}