import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const useLogin = async (username, password, attempt) => {
    const delay = 500;
    const [success, setSuccess] = useState(false);
    const { login } = useAuth();

    const userFound = await login(username, password);

    useEffect(() => {
        if (!attempt) {
            setSuccess(false);
            return;
        }

    }, [attempt]);

    return [success];
};

export default useLogin