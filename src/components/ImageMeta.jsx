import {Link} from "react-router-dom";
import Like from "./Like.jsx";
import {useDispatch} from "react-redux";
import {likeImage} from "../actions/imageThunks.js";
import {useState} from "react";
import "../styles/ImageMeta.css";

const ImageMeta = ({image, imageIndex}) => {

    const dispatch = useDispatch();
    const [processing, setProcessing] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const timeOptions = {
            hour: "2-digit",
            minute: "2-digit",
        };
        const time = date.toLocaleTimeString("ru", timeOptions);
        const formattedDate = date.toLocaleDateString();
        return `${time} ${formattedDate}`;
    };

    const handleLikeClick = () => {
        if (processing === true) {
            return;
        }
        setProcessing(true);
        dispatch(likeImage({imageId: image.id, imageIndex: imageIndex}))
            .finally(() => setProcessing(false));
    };

    return (
        <div className="image-meta">
            <span className="image-author">
                <span className="author-prefix">by</span>
                <Link to={"/user/" + image.username}>{image.username}</Link>
            </span>
            <div className="image-meta-right">
                <span className="image-upload-date">{formatDate(image.uploadedAt)}</span>
                <Like
                    isLiked={image.isLiked}
                    likesCount={image.likesCount}
                    onLikeClick={handleLikeClick}
                />
            </div>
        </div>
    );
};

export default ImageMeta;