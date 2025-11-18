const validationRules = {
    username: {
        pattern: /^[a-zA-Z0-9_-]{3,30}$/,
        message: "Username must be 3-30 characters long and can contain lowercase letters, numbers, underscores, and hyphens.",
        test: username => username && validationRules.username.pattern.test(username)
    },
    password: {
        minLength: 8,
        maxLength: 50,
        message: "Password must be between 8 and 50 characters long.",
        test: password => password &&
            (password.length >= validationRules.password.minLength
                && password.length <= validationRules.password.maxLength)
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please, enter a valid email address.",
        test: email => email && validationRules.email.pattern.test(email)
    },
    description: {
        maxLength: 1000,
        message: "Description should not be blank. Max characters : 1000",
        test: description => description &&
            description.trim().length !== 0 &&
            description.length < validationRules.description.maxLength
    },
    imageFile: {
        message: "Please, upload a valid image.",
        validExtensions: ["jpg", "jpeg", "png"],
        test: imageFile => imageFile &&
            imageFile.type.startsWith('image/') &&
            validationRules.imageFile.validExtensions.includes(
                imageFile.name.split('.').pop()
            )
    },
};

export const validateForm = formData => {
    const errors = {};
    Object.keys(formData).forEach(key => {
        errors[key] = validateField(key, formData[key]);
    });
    return errors;
};

const validateField = (name, value) => {
    const rules = validationRules[name];
    return !rules || rules.test(value) ? "" : rules.message;
};