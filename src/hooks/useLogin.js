import { useState, useEffect } from "react";
import { getAllUser } from "../utils/Storage"

const useLogin = (username, password, attempt) => {
    const [errors, setErrors] = useState({username: '', password: ''});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!attempt) {
            setErrors({username: '', password: ''});
            setSuccess(false);
            return;
        }

        if (attempt && !username && !password) {
            setErrors({username: 'Username is required', password: 'Password is required'});
            setSuccess(false);
            return;
        }

        const allUsers = getAllUser();
        const usernameMatch = allUsers.find(user => user.username === username);
        const passwordMatch = allUsers.find(user => user.password === password);
        const userFound = usernameMatch && passwordMatch;

        if (usernameMatch && !passwordMatch) {
            setErrors(prev => ({...prev, password: 'Incorrect password'}));
            setSuccess(false);
            return;
        }
        if (passwordMatch && !usernameMatch) {
            setErrors(prev => ({...prev, username: 'Incorrect username'}));
            setSuccess(false);
            return;
        }
        if (userFound) {
            setErrors({username: '', password: ''});
            setSuccess(true);
            return;
        }
    }, [attempt, success]);

    return [errors, success];
};

export default useLogin