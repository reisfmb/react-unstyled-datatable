/// <reference types="react" />
import { Column, Transform, DataTableConfig } from './DataTable';
interface DataTableBodyProps<Item> {
    CONFIG: DataTableConfig;
    DATA: Array<Item>;
    COLUMNS: Array<Column<Item>>;
    TRANSFORMATIONS: Array<Transform<Item>>;
    SCROLL_REACHED_BOTTOM_STATE: boolean;
    onRowClick: (item: Item) => void;
}
declare function DataTableBody<Item>(props: DataTableBodyProps<Item>): JSX.Element;
export { DataTableBody };
