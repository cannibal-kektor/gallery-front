import {protectedApi} from "../api/api.js";

export const imageService = {

    getImages: (params) => {
        return protectedApi.get("/images", {params});
    },

    getImagesByUsername: (username, params) => {
        return protectedApi.get(`/images/username/${username}`, {params});
    },

    uploadImage: (formData) => {
        return protectedApi.post("/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },

    likeImage: (imageId) => {
        return protectedApi.post(`/images/${imageId}/like`);
    },

    deleteImage: (imageId) => {
        return protectedApi.delete(`/images/${imageId}`);
    },

    editImage: (imageId, formData) => {
        return protectedApi.put(`/images/${imageId}`, formData);
    }
};