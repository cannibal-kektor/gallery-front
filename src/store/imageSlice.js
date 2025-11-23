import {editImage, getImages, getImagesByUsername, likeImage} from "../actions/imageThunks.js";
import {createSlice, isAnyOf} from "@reduxjs/toolkit";

const imageSlice = createSlice({
    name: "images",
    initialState: {
        images: [],
        hasNext: true,
        sortBy: "uploadedAt",
        sortOrder: "desc",
        dateRange: null,
        tillDate: null
    },
    reducers: {
        toggleSort: (state, action) => {
            const newSortBy = action.payload;
            if (newSortBy === state.sortBy) {
                state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
            } else {
                state.sortBy = newSortBy;
                state.sortOrder = "desc";
            }
            state.images = [];
            state.hasNext = true;
        },
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
            state.images = [];
            state.hasNext = true;
        },
        clearImages: (state) => {
            state.images = [];
            state.hasNext = true;
        }
    },

    extraReducers: (builder) => {
        builder
            .addMatcher(
                isAnyOf(likeImage.fulfilled, editImage.fulfilled),
                (state, action) => {
                    const {data, imageIndex} = action.payload;
                    if (state.images[imageIndex]?.id === data.id) {
                        state.images[imageIndex] = data;
                    } else {
                        const index = state.images.findIndex(img => img.id === data.id);
                        if (index !== -1) {
                            state.images[index] = data;
                        }
                    }
                })
            .addMatcher(
                isAnyOf(getImages.fulfilled, getImagesByUsername.fulfilled),
                (state, action) => {
                    const {data, initialLoad} = action.payload;
                    state.images = initialLoad ?
                        [...data.content] :
                        [...state.images, ...data.content];
                    state.hasNext = !data.last;
                }
            );
    }
});

export const {toggleSort, setDateRange, clearImages} = imageSlice.actions;
export default imageSlice.reducer;