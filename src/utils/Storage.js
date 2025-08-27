import { useState, useEffect } from "react";

const NOTE_KEY = 'note';
const USER_KEY = 'user';
const SESSION_KEY = 'currentUser';

export const getAllUser = () => {
    return JSON.parse(localStorage.getItem(USER_KEY) || '[]');
}

export const saveUser = (data) => {
    localStorage.setItem(USER_KEY, JSON.stringify(data));
}

export const saveUserSession = (data) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

const saveNotes = (notes) => {
    localStorage.setItem(NOTE_KEY, JSON.stringify(notes));
}

const getSavedNotes = () => {
    return JSON.parse(localStorage.getItem(NOTE_KEY)) || [];
}

/* const export useLocalStorage = (notes) => {
    const [notes, setTodos] = useState(getSavedNotes());

    useEffect(() => {
        saveNotes(notes);
    }, [notes]);

    return [notes, setNotes];
} */