import {Outlet} from "react-router-dom";
import NavigationPanel from "./NavigationPanel.jsx";
import UserInfoPanel from "./UserInfoPanel.jsx";
import "../styles/AppLayout.css";

const AppLayout = () => (
    <div className="app-layout">
        <header className="app-header">
            <NavigationPanel/>
            <UserInfoPanel/>
        </header>
        <main className="main-content">
            <Outlet/>
        </main>
    </div>
);

export default AppLayout;