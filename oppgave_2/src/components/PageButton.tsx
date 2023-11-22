// Need types for typescript later
export default function PageButton({onClick, label}) {
    return (
        <button className="page-button" onClick={onClick}>{label}</button>
    )
}