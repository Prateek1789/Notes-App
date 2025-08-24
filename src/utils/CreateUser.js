import { getAllUser, saveUser, saveUserSession } from "./Storage";

const CreateUser = (username, email, password) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            try {
                const existingUsers = getAllUser();
                const userExists = existingUsers.some(user => user.email === email || user.username === username);

                if (userExists) {
                    reject(new Error('User with this username or email already exists'));
                    return;
                }

                const newUser = {
                    userID: Date.now().toString(),
                    username,
                    email,
                    password,
                    createdOn: new Date().toISOString(),
                    isActive: true
                };
                const updatedUsers = [newUser, ...existingUsers];
                saveUser(updatedUsers);

                const userSession = {
                    id: newUser.userID,
                    name: newUser.username,
                    email: newUser.email,
                    isLoggedIn: newUser.isActive
                };
                saveUserSession(userSession);

                resolve({
                    success: true,
                    message: 'Account created successfully!',
                    user: userSession
                });
            }
            catch (error) {
                reject(new Error('Falied to create account. Please try again later'));
            }
        }, 300);
    });
};

export default CreateUser;