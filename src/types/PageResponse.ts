export type PageResponse<T> = {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    empty: boolean;
}