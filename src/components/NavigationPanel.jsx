import {Link, NavLink, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import "../styles/NavigationPanel.css";

const NavigationPanel = () => {

    const {username} = useParams();
    const {user} = useSelector((state) => state.auth);

    return (
        <nav className="nav-container">
            <div className="nav-links">
                <span>Images :</span>
                <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
                    All
                </NavLink>
                <NavLink to={"/user/" + user.username}
                         className={({isActive}) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
                    Mine
                </NavLink>
                {username && username !== user.username &&
                    <NavLink to={"/user/" + username}
                             className={({isActive}) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
                        {username}`s
                    </NavLink>
                }
            </div>
            <div className="nav-brand">
                <Link to="/">Gallery</Link>
            </div>
        </nav>
    );
};

export default NavigationPanel;