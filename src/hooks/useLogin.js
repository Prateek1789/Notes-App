import { useState, useEffect } from "react";
import { getAppData } from "../utils/Storage"

const useLogin = (username, password, attempt) => {
    const delay = 500;
    const [commonError, setCommonError] = useState('');
    const [uniqueError, setUniqueError] = useState({username: '', password: ''});
    const [success, setSuccess] = useState(false);
    const [activeUser, setActiveUser] = useState({});

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
            const appData = getAppData();
            const user = appData.users.find(user => user.username === username && user.password === password);

            if (!user) {
                setCommonError('Incorrect Username or Password');
                setUniqueError({username: '', password: ''});
                setSuccess(false);
                return;
            }
            if (user) {
                setCommonError('');
                setUniqueError({username: '', password: ''});
                setActiveUser(user);
                setSuccess(true);
                return;
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [attempt]);

    return [uniqueError, commonError, success, activeUser];
};

export default useLogin