import { useEffect, useContext, createContext, useReducer } from "react";
import { saveAppData, getAppData } from "../utils/Storage";

const AuthContext = createContext();

const actions = {
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
    REGISTER: 'REGISTER',
    DELETE_USER: 'DELETE_USER'
};

const authReducer = (state, action) => {
    switch(action.type) {
        case actions.LOG_IN:
            // Reset active user as empty strings (falsey value)
            return { ...state, activeUser: { id: action.payload.id, username: action.payload.username } };
        case actions.LOG_OUT:
            // Reset active user as empty strings (falsey value)
            return { ...state, activeUser: null };
        case actions.REGISTER:
            // Add new userObject into users array and set active user as the newly created user
            return { users: {[action.payload.id]: action.payload, ...state.users}, activeUser: { id: action.payload.id, username: action.payload.username } };
        case actions.DELETE_USER:
            // Remove a specific User from users array
            const { [state.activeUser.id]: removed, ...users} = state.users;
            return { users: users, activeUser: null };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, getAppData());

    useEffect(() => saveAppData(state), [state]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const {state, dispatch} = useContext(AuthContext);
    if (!state) throw new Error('AuthContext must be used within AuthProvider');

    const login = (user) => dispatch({ type: actions.LOG_IN, payload: user });
    const logout = () => dispatch({ type: actions.LOG_OUT});
    const register = (user) => dispatch({ type: actions.REGISTER, payload: user });
    const deleteUser = () => dispatch({ type: actions.DELETE_USER });

    return {...state, login, logout, register, deleteUser };
};