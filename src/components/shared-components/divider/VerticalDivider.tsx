type VerticalDividerProps = {
    width?: string,
    color?: string,
    border?: string,
}


export default function VerticalDivider({ width = "20px", color = "#B22222", border = "1px solid #B22222" }: VerticalDividerProps) {
    const style = { width: width, color: color, border: border};
    return (
        <span className="vertical-divider" style={style}></span>
    )
}