import "../styles/FormInput.css";

const InputField = ({
                        id,
                        name,
                        type = "text",
                        value,
                        onChange,
                        label,
                        error,
                        required = true
                    }) => {

    const isTextArea = type === "textArea";
    const valueProp = type !== "file" ? {value: value || ""} : {};
    const commonProps = {
        id,
        name,
        onChange,
        required,
        className: error ? "input-error" : "",
    };

    return (
        <div className="form-input">
            <label htmlFor={id}>{label}</label>
            {!isTextArea ? (
                <input
                    type={type}
                    {...commonProps}
                    {...valueProp}
                />
            ) : (
                <textarea
                    {...commonProps}
                    {...valueProp}
                    rows={4}
                />
            )}
            {error && <div className="form-input-validation-error">{error}</div>}
        </div>
    );
};

export default InputField;