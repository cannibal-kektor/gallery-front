import {Link} from "react-router-dom";
import InputField from "./InputField.jsx";
import {validateForm} from "../utils/inputValidator.js";
import {useState} from "react";
import CloseButton from "./CloseButton.jsx";
import "../styles/GenericForm.css";

const GenericForm = ({
                         submitAction,
                         title,
                         fields,
                         processing,
                         errorInfo,
                         link,
                         buttonText,
                         onClose
                     }) => {

    const [formData, setFormData] = useState(getInitialFormData(fields));
    const [validationErrors, setValidationErrors] = useState({});


    function getInitialFormData(fields) {
        return fields.reduce((accumulator, field) => {
            accumulator[field.name] = null;
            return accumulator;
        }, {});
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === "file" ?
                e.target.files[0] : e.target.value,
        });
        setValidationErrors({
            ...validationErrors,
            [e.target.name]: ""
        });
    };

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