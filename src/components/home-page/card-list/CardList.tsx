import "../../shared-components/card/SharedCard.css"
import "./CardList.css"

type CardListProps = {
    heading: string,
    items: React.ReactNode[]
}

export default function CardList({ heading, items }: CardListProps) {
    return (
        <>
            <div className="card-list-container">
                <div className="card-list-wrapper">
                    <section className="card-list-content">
                        <div className="card-list-heading">
                            <h2>{heading}</h2>
                            <a href="">See All</a>
                        </div>
                        <div className="card-list">
                            {items.map((item, index) => (
                                <div key={index}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </section>
                    <div className="card-list-pagination">Pagination</div>
                </div>
            </div>
        </>
    )
}