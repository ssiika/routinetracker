import axios from 'axios';

const API_URL = '/api/users/';

interface UserData {
    username: string,
    password: string
}
// Register user
const register = async (userData: UserData) => {
    const response = await axios.post(API_URL, userData)
        .catch(function (error) {
            if (error.response.data) {
                throw new Error(error.response.data);
            }
    })

    if (response && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }

    return response;
}

// Login user
const login = async (userData: UserData) => {
    const response = await axios.post(API_URL + 'login', userData)
        .catch(function (error) {
            if (error.response.data) {
                throw new Error(error.response.data);
            }
        })
    if (response && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }

    return response;
}

// Logout user 
const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    logout,
    login,
}

export default authService