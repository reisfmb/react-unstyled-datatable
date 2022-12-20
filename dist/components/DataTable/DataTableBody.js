import React from 'react';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
function DataTableBody(props) {
    const { CONFIG, DATA, COLUMNS, TRANSFORMATIONS, SCROLL_REACHED_BOTTOM_STATE, onRowClick } = props;
    const [increment, setIncrement] = useState(0);
    useEffect(updateIncrement, [SCROLL_REACHED_BOTTOM_STATE]);
    function updateIncrement() {
        if (SCROLL_REACHED_BOTTOM_STATE) {
            setIncrement(increment + (CONFIG.NUM_ITEMS_TO_INCREASE_PER_SCROLL || 0));
        }
    }
    const DATA_TO_SHOW = CONFIG.SHOW_ALL_ITEMS
        ? DATA
        : DATA.slice(0, (CONFIG.NUM_ITEMS_TO_SHOW_INITTIALY || 0) + increment);
    return React.createElement("tbody", null, DATA_TO_SHOW.map(item => React.createElement(React.Fragment, null,
        React.createElement("tr", { onClick: () => onRowClick(item) }, COLUMNS.map(({ accessor }) => React.createElement(React.Fragment, null,
            React.createElement("td", null, proccessData(item, accessor, TRANSFORMATIONS))))))));
}
// Helper Functions
function proccessData(item, accessor, transformations) {
    const transformation = transformations.find(transformation => transformation.accessor.toString() === accessor.toString());
    const value = get(item, accessor, '');
    if (value !== undefined && transformation) {
        return transformation.transform(value);
    }
    return value;
}
export { DataTableBody };
