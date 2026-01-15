import {Link, NavLink, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";
import {selectUser} from "../store/selectors.js";
import "../styles/NavigationPanel.css";

const NavigationPanel = React.memo(() => {

    const {username} = useParams();
    const user = useSelector(selectUser);

    const getNavLinkClassName = ({isActive}) => `nav-link ${isActive ? "nav-link-active" : ""}`;

    return (
        <nav className="nav-container">
            <div className="nav-links">
                <span>Images :</span>
                <NavLink to="/" className={getNavLinkClassName}>
                    All
                </NavLink>
                <NavLink to={"/user/" + user.username}
                         className={getNavLinkClassName}>
                    Mine
                </NavLink>
                {username && username !== user.username &&
                    <NavLink to={"/user/" + username}
                             className={getNavLinkClassName}>
                        {username}`s
                    </NavLink>
                }
            </div>
            <div className="nav-brand">
                <Link to="/">Gallery</Link>
            </div>
        </nav>
    );
});

export default NavigationPanel;