import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/authThunks.js";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";

const AppLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <div className="app-layout">
            <header className="app-header">
                <nav className="nav-container">
                    <div className="nav-brand">
                        <Link to="/">Gallery</Link>
                    </div>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">All posts</Link>
                        <Link to="/my-posts" className="nav-link">My posts</Link>
                        {user && (
                            <span className="user-info">
                                <span>{user.username}</span>
                                <button onClick={handleLogout} className="logout-btn">
                                {loggingOut ? "Logging out..." : "Logout"}
                            </button>
                        </span>)}
                    </div>
                </nav>
            </header>
            <main className="main-content">
                <Outlet/>
            </main>
        </div>
    );
};

export default AppLayout;