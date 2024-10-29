export type PaginationSmallType = {
    currentStart: number;
    currentEnd: number;
    totalItems: number;
    onNext: () => void;
    onPrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
}