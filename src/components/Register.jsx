import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../actions/authThunks.js";
import {clearErrorMsg} from "../store/authenticationSlice.js";
import {useNavigate} from "react-router-dom";
import {validateForm} from "../utils/inputValidator.js";
import AuthForm from "./AuthForm.jsx";

const Register = () => {
    const [formData, setFormData] = useState({username: "", email: "", password: ""});
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, processing, errorInfo} = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm(formData);

        if (Object.values(errors).some(error => error !== "")) {
            setValidationErrors(errors);
            return;
        }

        const actionResult = await dispatch(register(formData));
        if (register.fulfilled.match(actionResult)) {
            navigate("/login");
        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearErrorMsg());
        };
    }, [dispatch]);

    const inputFields = [
        {
            id: "reg-username",
            name: "username",
            type: "text",
            label: "Username",
            value: formData.username,
            onChange: handleChange,
            error: validationErrors.username
        },
        {
            id: "reg-email",
            name: "email",
            type: "email",
            label: "Email",
            value: formData.email,
            onChange: handleChange,
            error: validationErrors.email
        },
        {
            id: "reg-password",
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
            title="Registration"
            fields={inputFields}
            onSubmit={handleSubmit}
            processing={processing}
            errorInfo={errorInfo}
            link={{to: "/login", text: "Sign in"}}
            buttonText="Register"
        />
    );
};

export default Register;