import "../styles/CloseButton.css";
import React from "react";

const CloseButton = React.memo(({onClose}) => (
    <button
        type="button"
        className="close-button"
        onClick={onClose}
        aria-label="Close">
        ×
    </button>
));

export default CloseButton;