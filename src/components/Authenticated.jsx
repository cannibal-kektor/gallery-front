import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {selectUser} from "../store/selectors.js";

const Authenticated = ({children}) => {
    const user = useSelector(selectUser);
    return user ? children : <Navigate to="/login" replace/>;
};

export default Authenticated;