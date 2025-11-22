import {commentService} from "../services/commentService.js";
import ConfirmationDialog from "./ConfirmationDialog.jsx";

const DeleteCommentConfirmation = ({commentId, onClose, refreshComments}) => {

    const deleteCommentAction = () => {
        return commentService.deleteComment(commentId)
            .then(() => refreshComments());
    };

    return (
        <ConfirmationDialog
            promiseAction={deleteCommentAction}
            onClose={onClose}
            textMsg="Delete the comment?"
            buttonText="Delete"
        />
    );

};

export default DeleteCommentConfirmation;