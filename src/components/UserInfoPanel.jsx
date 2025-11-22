import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {logout} from "../actions/authThunks.js";
import {useDispatch, useSelector} from "react-redux";
import "../styles/UserInfoPanel.css";

const UserInfoPanel = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = () => {
        setLoggingOut(true);
        dispatch(logout())
            .unwrap()
            .then(() => navigate("/login"))
            .catch(error => console.error("Logout failed:", error.detail))
            .finally(() => setLoggingOut(false));
    };

    return (
        <div className="user-info">
            <span>{user.username}</span>
            <button onClick={handleLogout} className="logout-btn">
                {loggingOut ? "Logging out..." : "Logout"}
            </button>
        </div>
    );
};

export default UserInfoPanel;