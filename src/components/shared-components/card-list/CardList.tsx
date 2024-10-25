import "../../shared-components/card/SharedCard.css"
import PaginationSmall from "../pagination/PaginationSmall"
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
                            <h2 className="font-heading-h4">{heading}</h2>
                            <a className="font-lg-semibold" href="">See All</a>
                        </div>
                        <div className="card-list">
                            {items.map((item, index) => (
                                <div key={index}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </section>
                    <div className="pagination-sm-container">
                        <PaginationSmall />
                    </div>
                </div>
            </div>
        </>
    )
}