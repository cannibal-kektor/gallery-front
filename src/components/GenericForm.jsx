import {Link} from "react-router-dom";
import InputField from "./InputField.jsx";
import {validateForm} from "../utils/inputValidator.js";
import {useCallback, useMemo, useState} from "react";
import CloseButton from "./CloseButton.jsx";
import "../styles/GenericForm.css";

const GenericForm = ({
                         fields,
                         submitAction,
                         title,
                         processing,
                         errorInfo,
                         link,
                         buttonText,
                         onClose
                     }) => {

    const initialFormData = useMemo(() =>
        fields.reduce((acc, field) => {
            acc[field.name] = null;
            return acc;
        }, {}), [fields]
    );

    const [formData, setFormData] = useState(initialFormData);
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = useCallback((e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.type === "file" ?
                e.target.files[0] : e.target.value,
        }));
        setValidationErrors(prev => ({
            ...prev,
            [e.target.name]: ""
        }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        if (Object.values(errors).some(error => error !== "")) {
            setValidationErrors(errors);
            return;
        }
        submitAction(formData);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form" noValidate>
                <h2>{title}</h2>

                {onClose && <CloseButton onClose={onClose}/>}

                {errorInfo &&
                    <div className="form-error-info">
                        {errorInfo}
                    </div>
                }

                {fields.map((field) => (
                    <InputField key={field.name}
                                onChange={handleChange}
                                value={formData[field.name]}
                                error={validationErrors[field.name]}
                                {...field}
                    />
                ))}

                <button type="submit" className="form-submit-btn" disabled={processing}>
                    {processing ? "Processing, wait please" : buttonText || title}
                </button>

                {link && (
                    <p>
                        <Link className="form-additional-link" to={link.to}>{link.text}</Link>
                    </p>
                )}
            </form>
        </div>
    );
};

export default GenericForm;