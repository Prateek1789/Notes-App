import { useState, useEffect } from "react";
import { getAllUser } from "../utils/Storage"

const useLogin = (username, password, attempt) => {
    const delay = 500;
    const [commonError, setCommonError] = useState('');
    const [uniqueError, setUniqueError] = useState({username: '', password: ''});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!attempt) {
            setUniqueError({username: '', password: ''});
            setCommonError('');
            setSuccess(false);
            return;
        }
        if (!username && !password) {
            setCommonError('Username and Password are required');
            setUniqueError({username: '', password: ''});
            setSuccess(false);
            return;
        }
        if (!username) {
            setUniqueError(prev => ({...prev, username: 'Username is required'}));
            setCommonError('');
            setSuccess(false);
            return;
        }
        if (!password) {
            setUniqueError(prev => ({...prev, password: 'Password is required'}));
            setCommonError('');
            setSuccess(false);
            return;
        }

        const timer = setTimeout(() => {
            const allUsers = getAllUser();
            const userFound = allUsers.find(user => user.username === username && user.password === password);

            if (!userFound) {
                setCommonError('Incorrect Username or Password');
                setUniqueError({username: '', password: ''});
                setSuccess(false);
                return;
            }
            if (userFound) {
                setCommonError('');
                setUniqueError({username: '', password: ''});
                setSuccess(true);
                return;
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [attempt, success]);

    return [uniqueError, commonError, success];
};

export default useLogin