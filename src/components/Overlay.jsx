import "../styles/Overlay.css";

const Overlay = ({children, onClose}) => {

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="overlay-space" onClick={handleOverlayClick}>
            {children}
        </div>
    );
};

export default Overlay;