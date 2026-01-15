import {Link} from "react-router-dom";
import Like from "./Like.jsx";
import {useDispatch} from "react-redux";
import {likeImage} from "../actions/imageThunks.js";
import React, {useCallback, useState} from "react";
import "../styles/ImageMeta.css";
import {formatDate} from "../utils/utils.js";

const ImageMeta = React.memo(({image, imageIndex}) => {

    const dispatch = useDispatch();
    const [processing, setProcessing] = useState(false);

    const handleLikeClick = useCallback(() => {
        if (processing) return;
        setProcessing(true);
        dispatch(likeImage({imageId: image.id, imageIndex: imageIndex}))
            .finally(() => setProcessing(false));
    }, [image.id, imageIndex, processing, dispatch]);

    return (
        <div className="image-meta">
            <span className="image-author">
                <span className="author-prefix">by</span>
                <Link to={"/user/" + image.username}>{image.username}</Link>
            </span>
            <div className="image-meta-right">
                <span className="image-upload-date">Uploaded at: {formatDate(image.uploadedAt)}</span>
                <Like
                    isLiked={image.isLiked}
                    likesCount={image.likesCount}
                    onLikeClick={handleLikeClick}
                />
            </div>
        </div>
    );
});

export default ImageMeta;