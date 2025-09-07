import { useEffect, useContext, createContext, useReducer, act } from "react";
import { saveAppData, getAppData } from "../utils/Storage";

const AuthContext = createContext();

const initialState = { 
    users: {},
    activeUser: null
};

const actions = {
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
    CREATE_USER: 'CREATE_USER',
    DELETE_USER: 'DELETE_USER',
    UPDATE_USER: 'UPDATE_USER'
};

const authReducer = (state, action) => {
    switch(action.type) {
        // Set active user ID and name upon login 
        case actions.LOG_IN:
            return { ...state, activeUser: { id: action.payload.id, username: action.payload.username } };
        // Reset active user as NULL upon logout
        case actions.LOG_OUT:
            return { ...state, activeUser: null };
        // Add new Users into users array and set active user 
        case actions.CREATE_USER:
            return { users: {[action.payload.id]: action.payload, ...state.users}, activeUser: { id: action.payload.id, username: action.payload.username } };
        // Remove a specific User from users array
        case actions.DELETE_USER:
            const { [state.activeUser.id]: removed, ...users} = state.users;
            return { users: users, activeUser: null };
        // Update user
        case actions.UPDATE_USER:
            const key = Object.keys(action.payload)[0];
            const userObject = {...state.users};

            userObject[state.activeUser.id] = {
                ...state.users[state.activeUser.id],
                [key]: action.payload[key]
            };

            return { ...state, users: userObject };
        // Error for any undefined action type
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, getAppData() || initialState);

    const login = (user) => dispatch({ type: actions.LOG_IN, payload: user });
    const logout = () => dispatch({ type: actions.LOG_OUT});
    const register = (user) => dispatch({ type: actions.CREATE_USER, payload: user });
    const deleteUser = () => dispatch({ type: actions.DELETE_USER });
    const updateUser = (data) => dispatch({ type: actions.UPDATE_USER, payload: data });

    useEffect(() => saveAppData(state), [state]);

    return (
        <AuthContext.Provider value={{ ...state, login, logout, register, deleteUser, updateUser }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);