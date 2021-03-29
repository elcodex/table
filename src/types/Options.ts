export interface PageOptions {
    nextPageNumber?: number;
    sort?: SortOptions | null;
    filter?: string | null;
}

export interface SortOptions {
    direction: "asc" | "desc";
    fieldName: string;
}

export interface FilterOptions {
    text: string;
}