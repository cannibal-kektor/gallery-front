import {useCallback, useEffect, useMemo, useRef, useState} from "react";
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
    const infiniteScrollRef = useRef(null);

    const [imageModalOpened, setImageModalOpened] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const handleImageClick = useCallback((image, index) => {
        setSelectedImage(image);
        setSelectedImageIndex(index);
        setImageModalOpened(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedImage(null);
        setSelectedImageIndex(null);
        setImageModalOpened(false);
    }, []);

    useEffect(() => () => handleCloseModal(), [handleCloseModal]);

    useEffect(() => {
        if (selectedImage && selectedImageIndex !== null) {
            const updatedImage = images[selectedImageIndex];
            if (updatedImage && updatedImage.id === selectedImage.id) {
                setSelectedImage(updatedImage);
            }else {
                handleCloseModal();
            }
        }
    }, [images, selectedImage, selectedImageIndex, handleCloseModal]);

    const pullDownEvents = useMemo(() => [
        ["touchstart", "onStart"],
        ["touchmove", "onMove"],
        ["touchend", "onEnd"],
        ["mousedown", "onStart"],
        ["mousemove", "onMove"],
        ["mouseup", "onEnd"],
    ], []);

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
    }, [imageModalOpened, selectedImage, pullDownEvents]);

    const refreshContent = useCallback(() => {
        if (!selectedImage) {
            dispatch(clearImages());
        }
    }, [selectedImage, dispatch]);


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

            {imageModalOpened && (
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