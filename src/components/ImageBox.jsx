import ImageMeta from "./ImageMeta.jsx";
import {useEffect, useState} from "react";
import "../styles/ImageBox.css";

const ImageBox = ({image, index, onImageClick}) => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleImageClick = () => {
        onImageClick(image, index);
    };

    let imageClass = `image-box ${isVisible ? "image-card-fade-in" : "image-card-fade-out"}`;

    return (
        <div className={imageClass} key={image.id}>
            <div className="image-wrapper" onClick={handleImageClick}>
                <img
                    src={image.url}
                    alt={image.description || "ImageBox"}
                    loading="lazy"
                />
            </div>
            <div className="image-info">
                <p className="image-description">
                    {image.description || "No description"}
                </p>
                <ImageMeta image={image} imageIndex={index}/>
            </div>
        </div>
    );
};

export default ImageBox;