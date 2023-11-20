

// Need types for typescript later
export default function PageButton({onClick, label}) {
    return (
        <div className="center-container">
                <button className="page-button" onClick={onClick}>{label}</button>
        </div>
    )
}