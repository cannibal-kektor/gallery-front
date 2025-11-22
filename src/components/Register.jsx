import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../actions/authThunks.js";
import {useNavigate} from "react-router-dom";
import GenericForm from "./GenericForm.jsx";
import {username, password, email} from "../utils/formFields.js";
import "../styles/AuthorizationEnter.css";

const Register = () => {
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
        dispatch(register(formData))
            .unwrap()
            .then(() => navigate("/login"))
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
                title="Registration"
                submitAction={submitAction}
                fields={[username, password, email]}
                processing={processing}
                errorInfo={errorInfo}
                link={{to: "/login", text: "Sign in"}}
                buttonText="Register"
            />
        </div>
    );
};

export default Register;