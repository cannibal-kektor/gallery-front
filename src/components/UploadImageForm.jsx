import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {imageService} from "../services/imageService";
import {clearImages} from "../store/imageSlice.js";
import GenericForm from "./GenericForm.jsx";
import {description, imageFile} from "../utils/formFields.js";
import Overlay from "./Overlay.jsx";

const UploadImageForm = ({onClose}) => {

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const submitAction = useCallback((formData) => {
        setUploading(true);
        setError("");

        const submitData = new FormData();
        submitData.append("description", formData.description);
        submitData.append("imageFile", formData.imageFile);

        imageService.uploadImage(submitData)
            .then(() => onClose())
            .then(() => dispatch(clearImages()))
            .catch((error) => setError(error.response?.data?.detail || "Upload failed"))
            .finally(() => setUploading(false));
    }, [onClose, dispatch]);

    return (
        <Overlay onClose={onClose}>
            <GenericForm
                title="Upload Image"
                submitAction={submitAction}
                fields={[imageFile, description]}
                processing={uploading}
                errorInfo={error}
                buttonText="Upload"
                onClose={onClose}
            />
        </Overlay>
    );
};

export default UploadImageForm;