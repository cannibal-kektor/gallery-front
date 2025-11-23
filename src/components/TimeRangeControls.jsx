import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setDateRange} from "../store/imageSlice.js";
import {selectDateRange} from "../store/selectors.js";
import "../styles/TimeRangeControls.css";

const TimeRangeControls = React.memo(() => {

    const dispatch = useDispatch();
    const selectedRange = useSelector(selectDateRange);

    useEffect(() => () => dispatch(setDateRange(null)), [dispatch]);

    const timeRanges = useMemo(() => [
        {key: "last-day", label: "Day"},
        {key: "last-week", label: "Week"},
        {key: "last-month", label: "Month"},
        {key: "last-year", label: "Year"},
        {key: "all-time", label: "All time"}
    ], []);

    const handleDateRangeChange = (newRange) => {
        const newSelectedRange = newRange === selectedRange ? null : newRange;
        dispatch(setDateRange(newSelectedRange));
    };

    return (
        <div className="time-range-controls">
            <span>Period:</span>
            <div className="time-range-buttons">
                {timeRanges.map((range) => (
                    <button
                        key={range.key}
                        className={`time-range-btn ${selectedRange === range.key ? "active" : ""}`}
                        onClick={() => handleDateRangeChange(range.key)}
                    >
                        {range.label}
                    </button>
                ))}
            </div>
        </div>
    );
});

export default TimeRangeControls;