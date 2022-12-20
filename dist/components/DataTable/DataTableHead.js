import React from 'react';
function DataTableHead(props) {
    const { CONFIG, COLUMNS, FILTERS, SORTS, SORT_DIRECTIONS_STATE, onSort, onFilter } = props;
    return React.createElement("thead", null,
        React.createElement("tr", null, COLUMNS.map(({ view, accessor }) => React.createElement("th", { onClick: () => onSort(accessor) },
            view,
            ' ',
            SORTS.find(sort => sort.accessor.toString() === accessor) && ShowSortIcon(SORT_DIRECTIONS_STATE[accessor.toString()], CONFIG.ICONS.ASC, CONFIG.ICONS.DESC)))),
        React.createElement("tr", null, COLUMNS.map(({ accessor }) => {
            const filter = FILTERS.find(filter => filter.accessor.toString() === accessor.toString());
            if (!filter)
                return React.createElement("th", null);
            return React.createElement("th", null, processInput(filter, onFilter));
        })));
}
export { DataTableHead };
// Helper Functions
function ShowSortIcon(direction, iconASC, iconDESC) {
    if (direction === 'ASC') {
        return iconASC;
    }
    if (direction === 'DESC') {
        return iconDESC;
    }
    return React.createElement(React.Fragment, null);
}
// TODO: Implement support for other input types
function processInput(filter, onFilter) {
    const onChange = (e) => onFilter(filter.accessor, e.target.value);
    if (filter.input.type === 'text') {
        return React.createElement("input", { type: filter.input.type, placeholder: filter.input.placeholder, onChange: onChange });
    }
    if (filter.input.type === 'select') {
        return React.createElement("select", { onChange: onChange },
            React.createElement("option", { value: "" }, filter.input.placeholder),
            (filter.input.options || []).map(({ text, value }) => React.createElement(React.Fragment, null,
                React.createElement("option", { value: value }, text))));
    }
}
