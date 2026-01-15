import {createSelector} from "@reduxjs/toolkit";

export const selectUser = (state) => state.auth.user;
export const selectImages = (state) => state.images.images;
export const selectHasNext = (state) => state.images.hasNext;
export const selectSortBy = (state) => state.images.sortBy;
export const selectSortOrder = (state) => state.images.sortOrder;
export const selectDateRange = (state) => state.images.dateRange;

export const selectLoadedImages = createSelector(
    [selectImages, selectHasNext],
    (images, hasNext) => ({images, hasNext})
);

export const selectSortParams = createSelector(
    [selectSortBy, selectSortOrder],
    (sortBy, sortOrder) => ({sortBy, sortOrder})
);

export const selectTillDate = createSelector(
    [selectDateRange],
    dateRange => getTillDateByTimeRange(dateRange)
);

const getTillDateByTimeRange = (timeRange) => {
    const now = new Date();
    switch (timeRange) {
        case "last-day": {
            now.setDate(now.getDate() - 1);
            return now.toISOString();
        }
        case "last-week": {
            now.setDate(now.getDate() - 7);
            return now.toISOString();
        }
        case "last-month": {
            now.setMonth(now.getMonth() - 1);
            return now.toISOString();
        }
        case "last-year": {
            now.setFullYear(now.getFullYear() - 1);
            return now.toISOString();
        }
        case "all-time":
        default:
            return null;
    }
};