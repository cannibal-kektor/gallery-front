import {useState} from "react";
import DeleteImageConfirmation from "./DeleteImageConfirmation.jsx";
import EditImage from "./EditImage.jsx";
import "../styles/EditPanel.css";

const EditPanel = ({image, imageIndex}) => {
    const [isDeleteConfirmOpened, setDeleteConfirmationOpen] = useState(false);
    const [isEditPanelOpened, setEditPanelOpened] = useState(false);

    const openDeleteConfirm = () => setDeleteConfirmationOpen(true);
    const closeDeleteConfirm = () => setDeleteConfirmationOpen(false);

    const openEditPanel = () => setEditPanelOpened(true);
    const closeEditPanel = () => setEditPanelOpened(false);

    return (
        <div className="edit-section">
            <button className="edit-btn"
                    onClick={openEditPanel}>
                Edit ✎
            </button>
            <button className="remove-btn"
                    onClick={openDeleteConfirm}>
                Remove 🗑
            </button>
            {isEditPanelOpened &&
                <EditImage image={image}
                           imageIndex={imageIndex}
                           onClose={closeEditPanel}/>}
            {isDeleteConfirmOpened &&
                <DeleteImageConfirmation
                    imageId={image.id}
                    onClose={closeDeleteConfirm}
                />}
        </div>
    );
};

export default EditPanel;