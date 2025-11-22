import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setDateRange} from "../store/imageSlice.js";
import "../styles/TimeRangeControls.css";

const TimeRangeControls = () => {

    const dispatch = useDispatch();
    const [selectedRange, setSelectedRange] = useState(null);

    useEffect(() => {
        return ()=> {
            setSelectedRange(null)
            dispatch(setDateRange({tillDate: null}));
        };
    }, []);

    const timeRanges = [
        {key: "last-day", label: "Day"},
        {key: "last-week", label: "Week"},
        {key: "last-month", label: "Month"},
        {key: "last-year", label: "Year"},
        {key: "all-time", label: "All time"}
    ];

    const getTillDateByTimeRange = (timeRange) => {
        const now = new Date();
        switch (timeRange) {
            case "last-day":
                return new Date(now.setDate(now.getDate() - 1)).toISOString();
            case "last-week":
                return new Date(now.setDate(now.getDate() - 7)).toISOString();
            case "last-month":
                return new Date(now.setMonth(now.getMonth() - 1)).toISOString();
            case "last-year":
                return new Date(now.setFullYear(now.getFullYear() - 1)).toISOString();
            case "all-time":
            default:
                return null;
        }
    };

    const handleDateRangeChange = (newRange) => {
        if (newRange === selectedRange) {
            setSelectedRange(null);
            dispatch(setDateRange({tillDate: null}));
        } else {
            setSelectedRange(newRange);
            dispatch(setDateRange({tillDate: getTillDateByTimeRange(newRange)}));
        }
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
};

export default TimeRangeControls;