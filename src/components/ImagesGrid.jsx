import ImageBox from "./ImageBox.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {clearImages} from "../store/imageSlice.js";
import {useDispatch} from "react-redux";
import PullDownInfo from "./PullDownInfo.jsx";
import Spinner from "./Spinner.jsx";
import EndMessage from "./EndMessage.jsx";
import "../styles/ImagesGrid.css";

const ImagesGrid = ({images, onLoadMore, hasMore, loading}) => {

    const dispatch = useDispatch();

    const loadMoreData = () => {
        if (loading) return;
        onLoadMore();
    };

    const refreshContent = () => {
        dispatch(clearImages());
    };

    if (images.length === 0 && !loading) {
        return (
            <div className="image-grid-no-images-message">
                No images found.
            </div>
        );
    }

    return (
        <div className="image-grid-container">
            <InfiniteScroll
                dataLength={images.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={<Spinner message="Loading images..."/>}
                endMessage={<EndMessage infoMessage="No more images to load."/>}
                pullDownToRefresh={true}
                pullDownToRefreshThreshold={100}
                refreshFunction={refreshContent}
                pullDownToRefreshContent={<PullDownInfo infoMessage="↓ Pull down to refresh"/>}
                releaseToRefreshContent={<PullDownInfo infoMessage="↑ Release to refresh"/>}
            >
                <div className="image-grid-list">
                    {images.map((image, index) => (
                        <ImageBox image={image} key={image.id} index={index}/>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );

};

export default ImagesGrid;