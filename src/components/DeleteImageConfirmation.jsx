import {useDispatch} from "react-redux";
import {imageService} from "../services/imageService";
import {clearImages} from "../store/imageSlice.js";
import ConfirmationDialog from "./ConfirmationDialog.jsx";

const DeleteImageConfirmation = ({imageId, onClose}) => {

    const dispatch = useDispatch();

    const deleteImageAction = () =>
        imageService.deleteImage(imageId)
            .then(() => dispatch(clearImages()));

    return (
        <ConfirmationDialog
            promiseAction={deleteImageAction}
            onClose={onClose}
            textMsg="Delete the image?"
            buttonText="Delete"
        />
    );

};

export default DeleteImageConfirmation;