import { createContext, useContext, useReducer, useEffect } from "react";
import { dbWorkerCall } from "@/lib/WorkerClient";

const AuthContext = createContext();

function authReducer(state, action) {
    switch (action.type) {
        case "REGISTER":
            return { ...state, user: action.payload, isLoggedIn: true };
        case "LOGIN":
            return { ...state, user: action.payload, isLoggedIn: true };
        case "LOGOUT":
            return { ...state, user: null, isLoggedIn: false };
        default:
            return state;
    };
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isLoggedIn: false,
    });

    const fetchActiveUser = async () => {
        const activeUser = await dbWorkerCall("getActiveUser");
        if (activeUser) {
            dispatch({ type: "LOGIN", payload: activeUser });
        };
    };

    const register = async (formData) => {
        const existing = await dbWorkerCall("findUserByEmail", { email: formData.email });
        if (existing) throw new Error("A user by this Email already exists");

        const newUser = {
            id: crypto.randomUUID(),
            email: formData.email,
            username: formData.username,
            password: formData.password,
            dateCreated: new Date().toISOString(),
        };

        await dbWorkerCall("addUser", newUser);
        await dbWorkerCall("setActiveUser", { userId: newUser.id });

        dispatch({ type: "REGISTER", payload: newUser });
        return { success: true, newUser };
    };

    const login = async (username, password) => {
        const user = await dbWorkerCall("findUserByCredentials", { username, password });
        if (!user) throw new Error("Invalid Credentials");

        await dbWorkerCall("setActiveUser", { userId: user.id });
        dispatch({ type: "LOGIN", payload: user });
        return { success: true };
    };

    const logout = async () => {
        await dbWorkerCall("clearActiveUser");
        dispatch({ type: "LOGOUT" });
    };

    useEffect(() => {
        fetchActiveUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isLoggedIn: state.isLoggedIn,
            register,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);