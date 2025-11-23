import {useDispatch, useSelector} from "react-redux";
import {toggleSort} from "../store/imageSlice.js";
import React, {useCallback} from "react";
import {selectSortParams} from "../store/selectors.js";
import "../styles/SortControls.css";

const SortControls = React.memo(() => {

    const dispatch = useDispatch();
    const {sortBy, sortOrder} = useSelector(selectSortParams);

    const handleSortChange = useCallback(newSortBy => dispatch(toggleSort(newSortBy))
        , [dispatch]);

    const getSortBtnClassName = (btnSort) => `sort-btn ${sortBy === btnSort ? "active" : ""}`;

    return (
        <div className="sort-controls">
            <span>Sort by:</span>
            <button
                className={getSortBtnClassName("uploadedAt")}
                onClick={() => handleSortChange("uploadedAt")}
            >
                Date {sortBy === "uploadedAt" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
            <button
                className={getSortBtnClassName("likesCount")}
                onClick={() => handleSortChange("likesCount")}
            >
                Likes {sortBy === "likesCount" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
        </div>
    );
});

export default SortControls;