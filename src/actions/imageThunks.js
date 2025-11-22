import {createAsyncThunk} from "@reduxjs/toolkit";
import {imageService} from "../services/imageService.js";

export const getImages = createAsyncThunk(
    "images/fetchAllImages",
    async ({
               initialLoad,
               ...searchControls
           }, {rejectWithValue}) => {
        const params = constructQueryParams(searchControls);
        try {
            const response = await imageService.getImages(params);
            return {
                data: response.data,
                initialLoad
            };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getImagesByUsername = createAsyncThunk(
    "images/fetchImagesByUsername",
    async ({
               username,
               initialLoad,
               ...searchControls
           }, {rejectWithValue}) => {
        const params = constructQueryParams(searchControls);
        try {
            const response = await imageService.getImagesByUsername(username, params);
            return {
                data: response.data,
                initialLoad
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const likeImage = createAsyncThunk(
    "images/likeImage",
    async ({imageId, imageIndex}, {rejectWithValue}) => {
        try {
            const response = await imageService.likeImage(imageId);
            return {
                data: response.data,
                imageIndex
            };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editImage = createAsyncThunk(
    "images/editImage",
    async ({imageId, formData, imageIndex}, {rejectWithValue}) => {
        try {
            const response = await imageService.editImage(imageId, formData);
            return {
                data: response.data,
                imageIndex
            };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const constructQueryParams = (searchControls) => {
    return {
        sort: `${searchControls.sortBy},${searchControls.sortOrder}`,
        tillDate: searchControls.tillDate,
        size: searchControls.size,
        ...searchControls.cursorParams
    };
};