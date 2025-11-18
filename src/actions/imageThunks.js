import {createAsyncThunk} from "@reduxjs/toolkit";
import {imageService} from "../services/imageService.js";

export const getImages = createAsyncThunk(
    "images/fetchAllImages",
    async (searchControls, {rejectWithValue}) => {
        const params = constructQueryParams(searchControls);
        try {
            const response = await imageService.getImages(params);
            return response.data;
        } catch (error) {
            console.warn(error.message);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getImagesByUserId = createAsyncThunk(
    "images/fetchImagesByUserId",
    async ({
               userId,
               ...searchControls
           }, {rejectWithValue}) => {
        const params = constructQueryParams(searchControls);
        try {
            const response = await imageService.getImagesByUserId(userId, params);
            return response.data;
        } catch (error) {
            console.warn(error.message);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getImagesByUsername = createAsyncThunk(
    "images/fetchImagesByUsername",
    async ({
               username,
               ...searchControls
           }, {rejectWithValue}) => {
        const params = constructQueryParams(searchControls);
        try {
            const response = await imageService.getImagesByUsername(username, params);
            return response.data;
        } catch (error) {
            console.warn(error.message);
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
            console.warn(error.message);
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