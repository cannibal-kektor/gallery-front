import "../styles/Like.css";

const Like = ({isLiked, likesCount, onLikeClick}) => {
    return (
        <div className="like-container" onClick={onLikeClick}>
            <span className="image-like-icon">
                {isLiked ? "❤️" : "♡"}
            </span>
            <span className="image-likes-count">
                {likesCount}
            </span>
        </div>
    );
};

export default Like;