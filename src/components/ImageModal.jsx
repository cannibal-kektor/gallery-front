import {useEffect} from "react";
import ImageMeta from "./ImageMeta";
import CloseButton from "./CloseButton";
import CommentsSection from "./CommentsSection.jsx";
import {useSelector} from "react-redux";
import EditPanel from "./EditPanel.jsx";
import Overlay from "./Overlay.jsx";
import "../styles/ImageModal.css";

const ImageModal = ({image, imageIndex, onClose}) => {

    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [image]);

    return (
        <Overlay onClose={onClose}>
            <div className="image-modal-content">
                <CloseButton onClose={onClose}/>

                <div className="image-modal-body">
                    <div className="image-section">
                        <img
                            src={image.url}
                            alt={image.description || "Image"}
                            className="modal-image"
                        />
                        <div className="meta-section">
                            <ImageMeta
                                image={image}
                                imageIndex={imageIndex}/>
                        </div>
                    </div>

                    <div className="info-section">
                        { user.id === image.userId &&
                            <EditPanel
                                image={image}
                                imageIndex={imageIndex}/>}

                        {image.description && (
                            <div className="description-section">
                                <h3>Description :</h3>
                                <p className="info-section-description">{image.description}</p>
                            </div>
                        )}
                        <CommentsSection image={image}/>
                    </div>
                </div>
            </div>
        </Overlay>
    );
};

export default ImageModal;