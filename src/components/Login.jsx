import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/authThunks.js";
import {useNavigate} from "react-router-dom";
import GenericForm from "./GenericForm.jsx";
import {username, password} from "../utils/formFields.js";
import "../styles/AuthorizationEnter.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);

    const [processing, setProcessing] = useState(false);
    const [errorInfo, setErrorInfo] = useState(null);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const submitAction = (formData) => {
        if (processing) {
            return;
        }
        setProcessing(true);
        dispatch(login(formData))
            .unwrap()
            .catch(error => setErrorInfo(error.detail))
            .finally(() => setProcessing(false));
    };

    useEffect(() => {
        return () => {
            setErrorInfo(null);
        };
    }, [dispatch]);

    return (
        <div className="authorization-container">
            <GenericForm
                title="Sign in"
                submitAction={submitAction}
                fields={[username, password]}
                processing={processing}
                errorInfo={errorInfo}
                link={{to: "/register", text: "Registration"}}
                buttonText="Login"
            />
        </div>
    );

};

export default Login;