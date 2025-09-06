import { getAppData } from "./Storage";

const CreateUser = ({ username, email, password }) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            try {
                const appData = getAppData();
                const userExists = Object.values(appData.users).some(u => u.username === username || u.email === email);

                if (userExists) {
                    reject(new Error('A user with this username or email already exists'));
                    return;
                }

                const newUser = {
                    id: Date.now().toString(),
                    email,
                    username,
                    password,
                    createdOn: new Date().toISOString(),
                    isActive: true,
                    quickNotes: [],
                    notebooks: []
                };

                resolve({
                    success: true,
                    message: 'Account created successfully!',
                    newUser
                });
            }
            catch (error) {
                reject(new Error('Falied to create account. Please try again later'));
            }
        }, 300);
    });
};

export default CreateUser;