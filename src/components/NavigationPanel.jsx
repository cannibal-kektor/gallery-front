import {Link, NavLink, useParams} from "react-router-dom";
import "../styles/NavigationPanel.css";

const NavigationPanel = () => {

    const {username} = useParams();

    return (
        <nav className="nav-container">
            <div className="nav-links">
                <span>Images :</span>
                <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
                    All
                </NavLink>
                <NavLink to="/my-images" className={({isActive}) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
                    Mine
                </NavLink>
                {username &&
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