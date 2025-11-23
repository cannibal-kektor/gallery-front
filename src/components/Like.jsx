import React from "react";
import "../styles/Like.css";

const Like = React.memo(({isLiked, likesCount, onLikeClick}) => (
        <div className="like-container" onClick={onLikeClick}>
            <span className="image-like-icon">
                {isLiked ? "❤️" : "♡"}
            </span>
            <span className="image-likes-count">
                {likesCount}
            </span>
        </div>
    )
);

export default Like;