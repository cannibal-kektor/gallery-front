import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SortControls from "./SortControls.jsx";
import ImagesGrid from "./ImagesGrid.jsx";
import {clearImages} from "../store/imageSlice.js";
import ScrollToTopButton from "./ScrollToTopButton.jsx";
import TimeRangeControls from "./TimeRangeControls.jsx";
import UploadImageButton from "./UploadImageButton.jsx";
import {selectLoadedImages, selectSortParams, selectTillDate} from "../store/selectors.js";
import "../styles/Gallery.css";

const Gallery = ({fetchFunction, username}) => {
    const dispatch = useDispatch();

    const {images, hasNext} = useSelector(selectLoadedImages);
    const {sortBy, sortOrder} = useSelector(selectSortParams);
    const tillDate = useSelector(selectTillDate);

    const [loading, setLoading] = useState(false);
    const [errorInfo, setErrorInfo] = useState(null);

    useEffect(() => () => dispatch(clearImages()), [username, dispatch]);

    useEffect(() => {
        if (images.length === 0 && hasNext && !loading) {
            setLoadingState();
            loadImages({
                sortBy,
                sortOrder,
                tillDate,
                size: 9,
                initialLoad: true
            });
        }
    }, [images, sortBy, sortOrder, tillDate, fetchFunction, username]);

    const loadImages = useCallback((params) => {
        setLoadingState();
        dispatch(fetchFunction(params))
            .unwrap()
            .catch(error => setErrorInfo(error.detail))
            .finally(() => setLoading(false));
    }, [dispatch, fetchFunction]);

    const loadMoreImages = () => {
        if (loading || !hasNext) return;

        const lastImage = images[images.length - 1];
        let cursorParams = null;
        if (lastImage) {
            cursorParams = {
                "cursor-last-uploadedAt": lastImage.uploadedAt,
                "cursor-last-likesCount": lastImage.likesCount,
                "cursor-last-id": lastImage.id
            };
        }
        loadImages({
            sortBy,
            sortOrder,
            cursorParams,
            tillDate,
            size: 6,
            initialLoad: false
        });
    };


    const setLoadingState = () => {
        setLoading(true);
        setErrorInfo(null);
    };

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
            />
            <ScrollToTopButton/>
            <UploadImageButton/>
        </div>
    );
};

export default Gallery;
