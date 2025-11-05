import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Authenticated from "./components/Authenticated.jsx";
import AppLayout from "./components/AppLayout.jsx";
import Gallery from "./components/Gallery.jsx";
import MyPosts from "./components/MyPosts.jsx";

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
                            <Route index element={<Gallery/>}></Route>
                            <Route path="my-posts" element={<MyPosts/>}></Route>
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;