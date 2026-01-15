import {useCallback} from "react";
import "../styles/Overlay.css";

const Overlay = ({children, onClose}) => {

    const handleOverlayClick = useCallback((e) => {
        if (e.target === e.currentTarget) onClose();
    }, [onClose]);

    return (
        <div className="overlay-space" onClick={handleOverlayClick}>
            {children}
        </div>
    );
};

export default Overlay;