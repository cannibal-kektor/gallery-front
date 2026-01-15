import {getImagesByUsername} from "../actions/imageThunks.js";
import Gallery from "./Gallery.jsx";
import {useParams} from "react-router-dom";

const UserImages = () => {
    const {username} = useParams();
    const fetchFunction = (params) => getImagesByUsername({username, ...params});
    return <Gallery fetchFunction={fetchFunction} username={username}/>;
};

export default UserImages;