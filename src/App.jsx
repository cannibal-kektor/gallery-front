import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Authenticated from "./components/Authenticated.jsx";
import AppLayout from "./components/AppLayout.jsx";
import MyImages from "./components/MyImages.jsx";
import AllUsersImages from "./components/AllUsersImages.jsx";
import UserImages from "./components/UserImages.jsx";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/" element={
                            <Authenticated>
                                <AppLayout/>
                            </Authenticated>}>
                            <Route index element={<AllUsersImages/>}></Route>
                            <Route path="my-images" element={<MyImages/>}></Route>
                            <Route path="user/:username" element={<UserImages/>}></Route>
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;