import "./VerticalLine.css"

type VerticalLine = {
    width?: string,
    height?: string,
    color?: string,
}

export default function VerticalLine({ width = "1px", height = "20px", color = "#B22222" }: VerticalLine) {
    const style = { width: width, height: height, backgroundColor: color };
    return (
        <hr className="vertical-line" style={style} />
    )
}