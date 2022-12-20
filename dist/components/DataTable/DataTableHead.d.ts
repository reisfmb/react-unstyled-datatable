/// <reference types="react" />
import { DataTableConfig, Column, Filter, Sort } from './DataTable';
interface DataTableHeadProps<Item> {
    CONFIG: DataTableConfig;
    COLUMNS: Array<Column<Item>>;
    FILTERS: Array<Filter<Item>>;
    SORTS: Array<Sort<Item>>;
    SORT_DIRECTIONS_STATE: {
        [key: string]: string;
    };
    onSort: (accessor: string) => void;
    onFilter: (accessor: string, inputValue: any) => void;
}
declare function DataTableHead<Item>(props: DataTableHeadProps<Item>): JSX.Element;
export { DataTableHead };
