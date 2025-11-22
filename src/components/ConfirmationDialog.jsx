import {useState} from "react";
import GenericForm from "./GenericForm.jsx";
import Overlay from "./Overlay.jsx";
import "../styles/Overlay.css";

const ConfirmationDialog = ({promiseAction, onClose, textMsg, buttonText }) => {

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    const submitAction = () => {
        setProcessing(true);
        setError("");

        promiseAction()
            .then(() => onClose())
            .catch((error) => setError(error.response?.data?.detail || "Delete failed"))
            .finally(() => setProcessing(false));
    };

    return (
        <Overlay onClose={onClose}>
            <GenericForm
                title={textMsg || "Are you sure?"}
                submitAction={submitAction}
                processing={processing}
                errorInfo={error}
                fields={[]}
                buttonText={buttonText || "Yes"}
                onClose={onClose}
            />
        </Overlay>
    );
};

export default ConfirmationDialog;