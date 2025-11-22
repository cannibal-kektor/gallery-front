import {useState} from "react";
import {useDispatch} from "react-redux";
import GenericForm from "./GenericForm.jsx";
import {description} from "../utils/formFields.js";
import {editImage} from "../actions/imageThunks.js";
import Overlay from "./Overlay.jsx";

const EditImage = ({image, imageIndex, onClose}) => {

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const submitAction = (formData) => {
        setProcessing(true);
        setError("");

        dispatch(editImage({imageId: image.id, imageIndex: imageIndex, formData}))
            .then(() => onClose())
            .catch((error) => setError(error.response?.data?.detail || "Edit failed"))
            .finally(() => setProcessing(false));
    };

    return (
        <Overlay onClose={onClose}>
            <GenericForm
                title="Edit image description"
                submitAction={submitAction}
                fields={[{
                    ...description,
                    value: image.description
                }]}
                processing={processing}
                errorInfo={error}
                buttonText="Edit"
                onClose={onClose}
            />
        </Overlay>
    );
};

export default EditImage;