import {Link} from "react-router-dom";
import {formatDate} from "../utils/utils.js";
import {useSelector} from "react-redux";
import "../styles/Comment.css";

const Comment = ({comment, onDelete}) => {

    const {user} = useSelector((state) => state.auth);

    return (
        <div key={comment.id} className="comment-item">
            <div className="comment-header">
                <Link className="comment-author" to={"/user/" + comment.username}>{comment.username}</Link>
                <div className="comment-right-section">
                    {user.id === comment.userId &&
                        <button className="delete-comment-btn"
                                onClick={() => onDelete(comment)}>
                            Remove 🗑
                        </button>}
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                </div>
            </div>
            <p className="comment-text">{comment.content}</p>
        </div>
    );
};

export default Comment;