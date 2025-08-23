import { useState, useEffect } from "react";
import { emailValidator, passwordValidator } from "../utils/FormValidator";

export const useEmailValidation = (email, attempt = false, debounce = 800) => {
    const [validationState, setValisationState] = useState('idle');
    const [error, setError] = useState('');

    useEffect(() => {
        if (attempt && !email) {
            setValisationState('invalid');
            setError('Email is required');
            return;
        }
        if (!email) {
            setValisationState('idle');
            setError('');
            return;
        }
        
        setValisationState('pending');
        setError('');

        const timer = setTimeout(() => {
            const validationCheck = emailValidator.validateEmail(email);
            setValisationState(validationCheck.isValid ? 'valid' : 'invalid');
            setError(validationCheck.message);
        }, debounce);

        return () => clearTimeout(timer);
    }, [email, attempt]);

    return [validationState, error];
}

export const usePasswordValidation = (password, attempt = false, debounce = 800) => {
    const [validationState, setValisationState] = useState('idle');
    const [error, setError] = useState('');

    useEffect(() => {
        if (attempt && !password) {
            setValisationState('invalid');
            setError('Password is required');
            return;
        }
        if (!password) {
            setValisationState('idle');
            setError('');
            return;
        }

        setValisationState('pending');
        setError('');

        const timer = setTimeout(() => {
            const validationCheck = passwordValidator.validatePassword(password);
            setValisationState(validationCheck.isValid ? 'valid' : 'invalid');
            setError(validationCheck.message);
        }, debounce);

        return () => clearTimeout(timer);
    }, [password, attempt]);

    return [validationState, error];
}

export const useConfirmPassword = (password, confirmPassword, attempt = false, debounce = 800) => {
    const [validationState, setValisationState] = useState('idle');
    const [error, setError] = useState('');

    useEffect(() => {
        if (attempt && !confirmPassword) {
            setValisationState('invalid');
            setError('Please confirm password');
            return;
        }
        if (!confirmPassword) {
            setValisationState('idle');
            setError('');
            return;
        }
        if (!password) {
            setValisationState('invalid');
            setError('Please enter password first');
            return;
        }

        setValisationState('pending');
        setError('');

        const timer = setTimeout(() => {
            const test = password === confirmPassword;
            setValisationState(test ? 'valid' : 'invalid');
            setError(!test ? 'Passwords do not match' : '');
        }, debounce);

        return () => clearTimeout(timer);
    }, [password, confirmPassword, attempt]);

    return [validationState, error];
}