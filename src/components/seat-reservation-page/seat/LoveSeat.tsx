type LoveSeatProps = {
    number: string,
}

export default function LoveSeat({number}: LoveSeatProps) {
    return (
        <button>
            {number}
        </button>
    )
}