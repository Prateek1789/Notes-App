import { useState, useEffect } from "react";
import { emailValidator, passwordValidator } from "../utils/FormValidator";

export const useUsernameValidation = (username, attempt = false) => {
    const [validationState, setValidationState] = useState('idle');
    const [error, setError] = useState('');
    useEffect(() => {
        if (attempt && !username) {
            setValidationState('invalid');
            setError('Username is required');
            return;
        };
        
        setValidationState('idle');
        setError('');

    }, [attempt]);

    return [validationState, error];
}

export const useEmailValidation = (email, attempt = false, debounce = 800) => {
    const [validationState, setValidationState] = useState('idle');
    const [error, setError] = useState('');

    useEffect(() => {
        if (attempt && !email) {
            setValidationState('invalid');
            setError('Email is required');
            return;
        }
        if (!email) {
            setValidationState('idle');
            setError('');
            return;
        }
        
        setValidationState('pending');
        setError('');

        const timer = setTimeout(() => {
            const validationCheck = emailValidator.validateEmail(email);
            setValidationState(validationCheck.isValid ? 'valid' : 'invalid');
            setError(validationCheck.message);
        }, debounce);

        return () => clearTimeout(timer);
    }, [email, attempt]);

    return [validationState, error];
}

export const usePasswordValidation = (password, attempt = false, debounce = 800) => {
    const [validationState, setValidationState] = useState('idle');
    const [error, setError] = useState('');

    useEffect(() => {
        if (attempt && !password) {
            setValidationState('invalid');
            setError('Password is required');
            return;
        }
        if (!password) {
            setValidationState('idle');
            setError('');
            return;
        }

        setValidationState('pending');
        setError('');

        const timer = setTimeout(() => {
            const validationCheck = passwordValidator.validatePassword(password);
            setValidationState(validationCheck.isValid ? 'valid' : 'invalid');
            setError(validationCheck.message);
        }, debounce);

        return () => clearTimeout(timer);
    }, [password, attempt]);

    return [validationState, error];
}

export const useConfirmPassword = (password, confirmPassword, attempt = false, debounce = 800) => {
    const [validationState, setValidationState] = useState('idle');
    const [error, setError] = useState('');

    useEffect(() => {
        if (attempt && !confirmPassword) {
            setValidationState('invalid');
            setError('Please confirm password');
            return;
        }
        if (!confirmPassword) {
            setValidationState('idle');
            setError('');
            return;
        }
        if (!password) {
            setValidationState('invalid');
            setError('Please enter password first');
            return;
        }

        setValidationState('pending');
        setError('');

        const timer = setTimeout(() => {
            const test = password === confirmPassword;
            setValidationState(test ? 'valid' : 'invalid');
            setError(!test ? 'Passwords do not match' : '');
        }, debounce);

        return () => clearTimeout(timer);
    }, [password, confirmPassword, attempt]);

    return [validationState, error];
}