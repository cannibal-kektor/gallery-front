import UserImages from "./UserImages.jsx";
import {useSelector} from "react-redux";

const MyImages = () => {
    const {user} = useSelector((state) => state.auth);
    return <UserImages userId={user.id}/>;
};

export default MyImages;