import {useDispatch, useSelector} from "react-redux";
import {setSort} from "../store/imageSlice.js";
import '../styles/SortControls.css';

const SortControls = () => {

    const dispatch = useDispatch();
    const { sortBy, sortOrder } = useSelector((state) => state.images);

    const handleSortChange = (newSortBy) => {
        let newSortOrder = 'desc';

        // If clicking the same sort field, toggle order
        if (newSortBy === sortBy) {
            newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        }

        dispatch(setSort({ sortBy: newSortBy, sortOrder: newSortOrder }));
    };

    return (
        <div className="sort-controls">
            <span>Sort by:</span>
            <button
                className={`sort-btn ${sortBy === 'uploadedAt' ? 'active' : ''}`}
                onClick={() => handleSortChange('uploadedAt')}
            >
                Date {sortBy === 'uploadedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
                className={`sort-btn ${sortBy === 'likesCount' ? 'active' : ''}`}
                onClick={() => handleSortChange('likesCount')}
            >
                Likes {sortBy === 'likesCount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
        </div>
    );
};

export default SortControls;