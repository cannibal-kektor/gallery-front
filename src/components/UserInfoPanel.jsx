import {useNavigate} from "react-router-dom";
import React, {useCallback, useState} from "react";
import {logout} from "../actions/authThunks.js";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../store/selectors.js";
import "../styles/UserInfoPanel.css";

const UserInfoPanel = React.memo(() => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = useCallback(() => {
        setLoggingOut(true);
        dispatch(logout())
            .unwrap()
            .then(() => navigate("/login"))
            .catch(error => console.error("Logout failed:", error.detail))
            .finally(() => setLoggingOut(false));
    }, [navigate, dispatch]);

    return (
        <div className="user-info">
            <span>{user.username}</span>
            <button onClick={handleLogout} className="logout-btn">
                {loggingOut ? "Logging out..." : "Logout"}
            </button>
        </div>
    );
});

export default UserInfoPanel;