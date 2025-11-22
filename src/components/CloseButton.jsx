import "../styles/CloseButton.css";

const CloseButton = ({onClose}) => {
    return (
        <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close">
            ×
        </button>
    );
};

export default CloseButton;