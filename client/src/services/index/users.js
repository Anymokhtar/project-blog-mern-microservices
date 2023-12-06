import axios from "axios";

const localhostUrl = 'http://localhost';

// Définir une constante pour le port
const port = 5000; 

// Concaténer l'URL du serveur local avec le port
const apiUrl = `${localhostUrl}:${port}`;

export const signup = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post(`${apiUrl}/api/users/register`, {
            name,
            email,
            password,
        });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};
