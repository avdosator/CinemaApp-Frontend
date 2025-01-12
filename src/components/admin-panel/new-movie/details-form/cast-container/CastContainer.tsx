import "./CastContainer.css"

export default function CastContainer({ castData }: { castData: string[] }) {
    return (
        <div className="cast-writers-list">
            {castData.map((cast, index) => (
                <div key={index} className="actor-name-group">
                    <p className="font-md-semibold">{cast.split("/")[0]}</p>
                    <p className="font-sm-regular" style={{ color: "#667085" }}>{cast.split("/")[1]}</p>
                </div>
            ))}
        </div>
    )
}