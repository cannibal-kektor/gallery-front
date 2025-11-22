import {editImage, getImages, getImagesByUsername, likeImage} from "../actions/imageThunks.js";
import {createSlice, isAnyOf} from "@reduxjs/toolkit";

const imageSlice = createSlice({
    name: "images",
    initialState: {
        images: [],
        hasNext: true,
        sortBy: "uploadedAt",
        sortOrder: "desc",
        tillDate: null
    },
    reducers: {
        setSort: (state, action) => {
            state.sortBy = action.payload.sortBy;
            state.sortOrder = action.payload.sortOrder;
            state.images = [];
            state.hasNext = true;
        },
        setDateRange: (state, action) => {
            state.tillDate = action.payload.tillDate;
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

export const {setSort, setDateRange, clearImages} = imageSlice.actions;
export default imageSlice.reducer;