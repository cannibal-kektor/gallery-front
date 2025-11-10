const InputField = ({
                        id, name, type = "text",
                        value, onChange, label,
                        error, required = true
                    }) => {
    return (
        <div className="form-input">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={error ? "input-error" : ""}
            />
            {error && <div className="validation-error">{error}</div>}
        </div>
    );
};

export default InputField;