import React from "react"

export type CardList<T> = {
    heading: string,
    elements: T[],
    route: string,
    CardComponent: React.FC<T>
}
