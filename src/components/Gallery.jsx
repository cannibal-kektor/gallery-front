import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SortControls from "./SortControls.jsx";
import ImagesGrid from "./ImagesGrid.jsx";
import {clearImages} from "../store/imageSlice.js";
import ScrollToTopButton from "./ScrollToTopButton.jsx";
import TimeRangeControls from "./TimeRangeControls.jsx";
import UploadImageButton from "./UploadImageButton.jsx";
import "../styles/Gallery.css";

const Gallery = ({fetchFunction}) => {
    const dispatch = useDispatch();
    const {images, hasNext, sortBy, sortOrder, tillDate} = useSelector((state) => state.images);

    const [loading, setLoading] = useState(false);
    const [errorInfo, setErrorInfo] = useState(null);

    const loadMoreImages = () => {
        if (loading || !hasNext) return;

        setLoadingState();

        const lastImage = images[images.length - 1];
        let cursorParams = null;
        if (lastImage) {
            cursorParams = {
                "cursor-last-uploadedAt": lastImage.uploadedAt,
                "cursor-last-likesCount": lastImage.likesCount,
                "cursor-last-id": lastImage.id
            };
        }

        dispatch(fetchFunction({sortBy, sortOrder, cursorParams, tillDate, size: 10}))
            .unwrap()
            .catch(error => setErrorInfo(error.detail))
            .finally(() => setLoading(false));
    };


    useEffect(() => {
        if (images.length === 0 && hasNext && !loading) {

            setLoadingState();

            dispatch(fetchFunction({sortBy, sortOrder, tillDate, size: 6}))
                .unwrap()
                .catch(error => setErrorInfo(error.detail))
                .finally(() => setLoading(false));
        }
    }, [dispatch, fetchFunction, hasNext, images, sortBy, sortOrder, tillDate]);

    const setLoadingState = () => {
        setLoading(true);
        setErrorInfo(null);
    };

    useEffect(() => {
        return () => {
            dispatch(clearImages());
        };
    }, []);


    return (
        <div className="gallery-container">
            <div className="gallery-header">
                <TimeRangeControls/>
                <SortControls/>
            </div>

            {errorInfo && (
                <div className="gallery-error-message">
                    Error loading images: {errorInfo}
                </div>
            )}

            <ImagesGrid
                images={images}
                onLoadMore={loadMoreImages}
                hasMore={hasNext}
                loading={loading}
            />
            <ScrollToTopButton/>
            <UploadImageButton/>
        </div>
    );
};

export default Gallery;
