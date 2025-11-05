import {Link} from "react-router-dom";
import InputField from "./InputField.jsx";

const AuthForm = ({
                      title, fields,
                      onSubmit, processing,
                      errorInfo, link, buttonText
                  }) => {
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit} className="authentication-form" noValidate>
                <h2>{title}</h2>
                {errorInfo &&
                    <div className="errorInfo-message">
                        {errorInfo.detail || `${title} error`}
                    </div>
                }

                {fields.map((field) => (
                    <InputField key={field.name} {...field}/>
                ))}

                <button type="submit" disabled={processing}>
                    {processing ? "Processing, wait please" : buttonText || title}
                </button>

                {link && (
                    <p>
                        <Link className="auth-link" to={link.to}>{link.text}</Link>
                    </p>
                )}
            </form>
        </div>
    );
};

export default AuthForm;