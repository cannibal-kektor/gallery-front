import {getImages} from "../actions/imageThunks.js";
import Gallery from "./Gallery.jsx";

const AllUsersImages = () => {
    return <Gallery fetchFunction={getImages}/>;
};

export default AllUsersImages;