import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/authThunks.js";
import {clearErrorMsg} from "../store/authenticationSlice.js";
import {useNavigate} from "react-router-dom";
import {validateForm} from "../utils/inputValidator.js";
import AuthForm from "./AuthForm.jsx";

const Login = () => {
    const [formData, setFormData] = useState({username: "", password: ""});
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, processing, errorInfo} = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateForm(formData);
        if (Object.values(errors).some(error => error !== "")) {
            setValidationErrors(errors);
            return;
        }

        dispatch(login(formData));
    };

    useEffect(() => {
        return () => {
            dispatch(clearErrorMsg());
        };
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setValidationErrors({
            username: "",
            password: ""
        });
    };

    const inputFields = [
        {
            id: "login-username",
            name: "username",
            type: "text",
            label: "Username",
            value: formData.username,
            onChange: handleChange,
            error: validationErrors.username
        },
        {
            id: "login-password",
            name: "password",
            type: "password",
            label: "Password",
            value: formData.password,
            onChange: handleChange,
            error: validationErrors.password
        }
    ];

    return (
        <AuthForm
            title="Sign in"
            fields={inputFields}
            onSubmit={handleSubmit}
            processing={processing}
            errorInfo={errorInfo}
            link={{to: "/register", text: "Registration"}}
            buttonText="Login"
        />
    );

};

export default Login;