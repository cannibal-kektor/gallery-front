import {getImagesByUserId, getImagesByUsername} from "../actions/imageThunks.js";
import Gallery from "./Gallery.jsx";
import {useParams} from "react-router-dom";

const UserImages = ({userId}) => {

    const {username} = useParams();

    const fetchFunction = (params) =>
        username ?
            getImagesByUsername({username, ...params})
            : getImagesByUserId({userId, ...params});

    return <Gallery fetchFunction={fetchFunction}/>;
};

export default UserImages;