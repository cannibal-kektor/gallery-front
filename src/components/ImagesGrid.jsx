import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import ImageBox from "./ImageBox.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {clearImages} from "../store/imageSlice.js";
import PullDownInfo from "./PullDownInfo.jsx";
import Spinner from "./Spinner.jsx";
import EndMessage from "./EndMessage.jsx";
import ImageModal from "./ImageModal.jsx";
import "../styles/ImagesGrid.css";

const ImagesGrid = ({images, onLoadMore, hasMore}) => {

    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const infiniteScrollRef = useRef(null);

    useEffect(() => {
        return () => {
            handleCloseModal();
        };
    }, []);

    useEffect(() => {
        if (selectedImage) {
            setSelectedImage(images[selectedImageIndex]);
        }
    }, [images]);

    const pullDownEvents = [
        ["touchstart", "onStart"],
        ["touchmove", "onMove"],
        ["touchend", "onEnd"],
        ["mousedown", "onStart"],
        ["mousemove", "onMove"],
        ["mouseup", "onEnd"],
    ];

    useEffect(() => {
        const scrollComponent = infiniteScrollRef.current;
        if (!scrollComponent) return;
        const scrollElement = scrollComponent.el;
        if (selectedImage) {
            pullDownEvents.forEach(([event, handlerName]) =>
                scrollElement.removeEventListener(event, scrollComponent[handlerName]));
        } else
            pullDownEvents.forEach(([event, handlerName]) =>
                scrollElement.addEventListener(event, scrollComponent[handlerName]));
    }, [selectedImage]);

    const refreshContent = () => {
        if (!selectedImage) {
            dispatch(clearImages());
        }
    };

    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setSelectedImageIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
        setSelectedImageIndex(null);
    };

    return (
        <div className="image-grid-container" id="scrollableDiv">
            <InfiniteScroll
                dataLength={images.length}
                next={onLoadMore}
                hasMore={hasMore}
                loader={<Spinner message="Loading images..."/>}
                endMessage={<EndMessage infoMessage="No more images to load."/>}
                pullDownToRefresh={true}
                pullDownToRefreshThreshold={100}
                refreshFunction={refreshContent}
                pullDownToRefreshContent={<PullDownInfo infoMessage="↓ Pull down to refresh"/>}
                releaseToRefreshContent={<PullDownInfo infoMessage="↑ Release to refresh"/>}
                ref={infiniteScrollRef}
            >
                <div className="image-grid-list">
                    {images.map((image, index) => (
                        <ImageBox image={image}
                                  key={image.id}
                                  index={index}
                                  onImageClick={handleImageClick}
                        />
                    ))}
                </div>
            </InfiniteScroll>

            {selectedImage && (
                <ImageModal
                    image={selectedImage}
                    imageIndex={selectedImageIndex}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );

};

export default ImagesGrid;