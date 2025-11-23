import {useCallback, useEffect, useState} from "react";
import {commentService} from "../services/commentService.js";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner.jsx";
import EndMessage from "./EndMessage.jsx";
import Comment from "./Comment.jsx";
import PullDownInfo from "./PullDownInfo.jsx";
import DeleteCommentConfirmation from "./DeleteCommentConfirmation.jsx";
import {validateForm} from "../utils/inputValidator.js";
import {useSelector} from "react-redux";
import "../styles/CommentsSection.css";
import {selectUser} from "../store/selectors.js";

const CommentsSection = ({image}) => {

    const user = useSelector(selectUser);

    const [loading, setLoading] = useState(false);
    const [errorInfo, setErrorInfo] = useState(null);
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [hasMoreComments, setHasMoreComments] = useState(true);

    const [commentText, setCommentText] = useState("");
    const [commentErrorInfo, setCommentErrorInfo] = useState(null);

    const [isDeleteConfirmOpened, setDeleteConfirmationOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const openDeleteConfirm = useCallback((comment) => {
        setDeleteConfirmationOpen(true);
        setCommentToDelete(comment);
    }, []);

    const closeDeleteConfirm = useCallback(() => {
        setDeleteConfirmationOpen(false);
        setCommentToDelete(null);
    }, []);

    const refreshContent = useCallback(() => {
        setErrorInfo(null);
        setPage(0);
        setTotal(0);
        setHasMoreComments(true);
        setCommentText("");
        setCommentErrorInfo(null);
        setComments([]);
    }, []);

    useEffect(() => () => refreshContent(), [refreshContent]);

    useEffect(() => {
        if (comments.length === 0 && hasMoreComments && !loading) {
            loadComments(true);
        }
    }, [image, comments, hasMoreComments]);

    const loadMoreComments = () => {
        if (!loading) loadComments(false);
    };

    const loadComments = useCallback((isInitialLoad) => {
        setLoading(true);
        commentService.getImageComments(image.id, constructParams())
            .then(response => {
                const data = response.data;
                if (isInitialLoad) {
                    setComments(() => [...data.content]);
                } else {
                    setComments(prev => [...prev, ...data.content]);
                }
                setHasMoreComments(!data.last);
                setPage(prev => prev + 1);
                setTotal(data.totalElements);
            })
            .catch((error) => setErrorInfo(error.response?.data?.detail || "Failed to load comments"))
            .finally(() => setLoading(false));
    }, [image, page]);

    const handleCommentSubmit = useCallback((e) => {
        e.preventDefault();

        const errors = validateForm({"comment": commentText});
        if (errors["comment"] !== "") {
            setCommentErrorInfo(errors["comment"]);
            return;
        }

        const newComment = {
            content: commentText,
        };
        commentService.postComment(image.id, newComment)
            .then(() => refreshContent())
            .catch((error) => setCommentErrorInfo(error.response?.data?.detail || "Comment sending fail"));

    }, [commentText, image.id, refreshContent]);

    const constructParams = useCallback(() => ({
        page,
        size: 10,
        sort: ["createdAt,desc", "id,desc"]
    }), [page]);

    const onCommentChange = useCallback((e) => {
        setCommentErrorInfo(null);
        setCommentText(e.target.value);
    }, []);

    return (
        <div className="comments-section">
            <h3>Comments : {total}</h3>

            {errorInfo &&
                <div className="form-error-info">
                    {errorInfo}
                </div>
            }

            <InfiniteScroll
                dataLength={comments.length}
                next={loadMoreComments}
                hasMore={hasMoreComments}
                loader={<Spinner message="Loading comments..."/>}
                endMessage={<EndMessage infoMessage="No more comments"/>}
                height={390}
                pullDownToRefresh={true}
                pullDownToRefreshThreshold={60}
                refreshFunction={refreshContent}
                pullDownToRefreshContent={<PullDownInfo infoMessage="↓ Pull down to refresh"/>}
                releaseToRefreshContent={<PullDownInfo infoMessage="↑ Release to refresh"/>}
            >
                <div className="comments-list">
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            currentUserId={user.id}
                            onDelete={openDeleteConfirm}/>
                    ))}
                </div>
            </InfiniteScroll>

            {commentErrorInfo &&
                <div className="form-error-info">
                    {commentErrorInfo}
                </div>
            }

            <form className="comment-form" onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={onCommentChange}
                    className="comment-input"
                />
                <button type="submit" className="comment-submit-btn">
                    →
                </button>
            </form>

            {isDeleteConfirmOpened &&
                <DeleteCommentConfirmation
                    commentId={commentToDelete.id}
                    onClose={closeDeleteConfirm}
                    refreshComments={refreshContent}
                />}
        </div>
    );
};

export default CommentsSection;