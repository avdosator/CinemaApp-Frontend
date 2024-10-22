
type CardListProps = {
    heading: string,
    items: React.ReactNode[]
}

export default function CardList({ heading, items }: CardListProps) {
    console.log(heading, items);
    return (
        <>
            <div className="card-list-container">
                <main>
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
                </main>
            </div>
        </>
    )
}