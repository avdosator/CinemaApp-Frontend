
export default function WritersContainer({ writersData }: { writersData: string[] }) {
    return (
        <div className="cast-writers-list">
            {writersData.map((writer, index) => (
                <span className="font-md-semibold" key={index}>{writer}</span>
            ))}
        </div>
    )
}