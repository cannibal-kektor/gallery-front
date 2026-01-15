import {getImages} from "../actions/imageThunks.js";
import Gallery from "./Gallery.jsx";

const AllUsersImages = () => <Gallery fetchFunction={getImages}/>;

export default AllUsersImages;