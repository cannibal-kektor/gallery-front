import {protectedApi} from "../api/api.js";

export const commentService = {

    getImageComments: (imageId, params) => {
        return protectedApi.get(`/comments/image/${imageId}`, {params});
    },

    postComment: (imageId, comment) => {
        return protectedApi.post(`/comments/image/${imageId}/post`, comment);
    },

    deleteComment: (commentId) => {
        return protectedApi.delete(`/comments/${commentId}`);
    }
};