export const checkValidData = (email, password) => {
    const isEmailValid =
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (!isEmailValid) return 'Email ID is not valid';
    if (!isPasswordValid) return 'Password is not valid';
    return null;
};

export const validateUsername = (userName) => {
    // Use the regular expression for validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(userName)
        ? null
        : 'User name should be between 3-20 characters';
};
