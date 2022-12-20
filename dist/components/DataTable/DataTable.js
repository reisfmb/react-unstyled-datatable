import React from 'react';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { DataTableBody } from './DataTableBody';
import { DataTableHead } from './DataTableHead';
function DataTable(props) {
    const { CONFIG, DATA, COLUMNS, TRANSFORMATIONS, FILTERS, SORTS, onRowClick } = props;
    const [scrollReachedBottom, setScrollReachedBottom] = useState(false);
    const [currentSortDirectionsObj, setCurrentSortDirectionsObj] = useState(getInitialSortsObj(COLUMNS));
    const [currentFiltersObj, setCurrentFiltersObj] = useState(getInitialFiltersObj(COLUMNS));
    const [filteredData, setFilteredData] = useState(DATA);
    useEffect(applyDataFilters, [currentFiltersObj]);
    function applyDataFilters() {
        const filtersToBeApplied = Object.keys(currentFiltersObj).map(key => currentFiltersObj[key]);
        const newData = filtersToBeApplied.reduce((prev, currFilter) => {
            if (!currFilter)
                return prev;
            return prev.filter(item => currFilter(item));
        }, DATA);
        setFilteredData(newData);
    }
    function onScrollHandler(e) {
        if (CONFIG.SHOW_ALL_ITEMS) {
            return;
        }
        const scrollableElement = e.target;
        const reachedBottom = scrollableElement.scrollHeight - scrollableElement.scrollTop === scrollableElement.clientHeight;
        if (reachedBottom) {
            setScrollReachedBottom(reachedBottom);
            setTimeout(() => setScrollReachedBottom(false), 100);
        }
    }
    function onFilterHandler(accessor, inputValue) {
        const filter = FILTERS.find(filter => filter.accessor.toString() === accessor.toString());
        if (!filter)
            return;
        if (inputValue) {
            setCurrentFiltersObj(Object.assign(Object.assign({}, currentFiltersObj), { [accessor.toString()]: (item) => filter.filter(item, inputValue) }));
        }
        else {
            setCurrentFiltersObj(Object.assign(Object.assign({}, currentFiltersObj), { [accessor.toString()]: null }));
        }
    }
    function onSortHandler(accessor) {
        const sort = SORTS.find(sort => sort.accessor.toString() === accessor.toString());
        if (!sort)
            return;
        const sortDirection = (currentSortDirectionsObj[accessor.toString()] || 'DESC');
        setCurrentSortDirectionsObj(Object.assign(Object.assign({}, currentSortDirectionsObj), { [accessor.toString()]: sortDirection === 'ASC' ? 'DESC' : 'ASC' }));
        setFilteredData(filteredData.sort((a, b) => sort.sort(accessor, sortDirection, a, b)));
    }
    return React.createElement("div", { className: CONFIG.WRAPPER_DIV_CLASS, onScroll: debounce(onScrollHandler, 200) },
        React.createElement("table", null,
            DataTableHead({
                CONFIG,
                COLUMNS,
                FILTERS,
                SORTS,
                SORT_DIRECTIONS_STATE: currentSortDirectionsObj,
                onSort: onSortHandler,
                onFilter: onFilterHandler
            }),
            DataTableBody({
                CONFIG,
                DATA: filteredData,
                COLUMNS,
                TRANSFORMATIONS,
                SCROLL_REACHED_BOTTOM_STATE: scrollReachedBottom,
                onRowClick
            })));
}
export { DataTable };
// Helper Functions
function getInitialSortsObj(columns) {
    return columns.reduce((prev, curr) => (Object.assign(Object.assign({}, prev), { [curr.accessor.toString()]: 'DESC' })), {});
}
function getInitialFiltersObj(columns) {
    return columns.reduce((prev, curr) => (Object.assign(Object.assign({}, prev), { [curr.accessor.toString()]: null })), {});
}
