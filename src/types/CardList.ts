import React from "react"

export type CardList<T> = {
    heading: string,
    elements: T[],
    CardComponent: React.FC<T>
}
