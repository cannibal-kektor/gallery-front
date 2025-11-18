import {useState} from "react";
import UploadImageForm from "./UploadImageForm";
import "../styles/UploadImageButton.css";

const UploadImageButton = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    return (
        <>
            <button
                className="upload-image-btn"
                onClick={openForm}
                aria-label="Upload image">
                +
            </button>
            {isFormOpen && <UploadImageForm onClose={closeForm}/>}
        </>
    );
};

export default UploadImageButton;