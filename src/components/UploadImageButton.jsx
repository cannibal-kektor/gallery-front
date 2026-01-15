import React, {useCallback, useState} from "react";
import UploadImageForm from "./UploadImageForm";
import "../styles/UploadImageButton.css";

const UploadImageButton = React.memo(() => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = useCallback(() => setIsFormOpen(false), []);

    return (
        <div>
            <button
                className="upload-image-btn"
                onClick={openForm}
                aria-label="Upload image">
                +
            </button>
            {isFormOpen && <UploadImageForm onClose={closeForm}/>}
        </div>
    );
});

export default UploadImageButton;