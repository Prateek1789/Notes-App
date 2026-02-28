export const emailValidator = {
    isEmailvalid: (email) => {
        const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRule.test(email);
    },
    validateEmail: (email) => {
        if (!email) return { isValid: false, message: 'Email is required' };

        if (!emailValidator.isEmailvalid(email)) return { isValid: false, message: 'Invalid email' };

        return { isValid: true, message: '' };
    }
}

export const passwordValidator = {
    isPasswordValid: (password) => {
        return {
            isLongEnough: password.length >= 8,
            hasLowercase: /[a-z]/.test(password),
            hasUppercase: /[A-Z]/.test(password),
            hasNumber: /\d/.test(password)
        }
    },
    validatePassword: (password) => {
        if (!password) return { isValid: false, message: 'Password is required' };

        const test = passwordValidator.isPasswordValid(password);

        if (!test.isLongEnough) return { isValid: false, message: 'Password must be at least 8 characters' }

        if (!test.hasLowercase) return { isValid: false, message: 'Password must contain Lowecase character' }

        if (!test.hasUppercase) return { isValid: false, message: 'Password must contain Uppercase characters' }

        if (!test.hasNumber) return { isValid: false, message: 'Password must contain a number' }

        return { isValid: true, message: '' }
    }
}