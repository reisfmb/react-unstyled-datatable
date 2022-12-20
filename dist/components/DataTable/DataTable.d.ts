/// <reference types="react" />
interface Column<Item> {
    accessor: string;
    view: JSX.Element;
}
interface Transform<Item> {
    accessor: string;
    transform: (x: any) => JSX.Element;
}
interface Filter<Item> {
    accessor: string;
    filter: (item: Item, inputValue: any) => boolean;
    input: {
        type: 'text' | 'select';
        placeholder?: string;
        options?: Array<{
            text: string;
            value: string;
        }>;
    };
}
interface Sort<Item> {
    accessor: string;
    sort: (accessor: string, direction: 'ASC' | 'DESC', a: Item, b: Item) => number;
}
interface DataTableConfig {
    SHOW_ALL_ITEMS: boolean;
    ICONS: {
        ASC: JSX.Element;
        DESC: JSX.Element;
    };
    NUM_ITEMS_TO_SHOW_INITTIALY?: number;
    NUM_ITEMS_TO_INCREASE_PER_SCROLL?: number;
    WRAPPER_DIV_CLASS?: string;
}
interface DataTableProps<Item> {
    CONFIG: DataTableConfig;
    DATA: Array<Item>;
    COLUMNS: Array<Column<Item>>;
    TRANSFORMATIONS: Array<Transform<Item>>;
    FILTERS: Array<Filter<Item>>;
    SORTS: Array<Sort<Item>>;
    onRowClick: (item: Item) => void;
}
type SortDirection = 'ASC' | 'DESC';
declare function DataTable<Item>(props: DataTableProps<Item>): JSX.Element;
export { DataTable };
export type { Column, Transform, Filter, Sort, SortDirection, DataTableConfig };
