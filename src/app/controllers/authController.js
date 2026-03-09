import {env} from '@/app/init/env';

const loginController = async (payload) => {
    const url = env.serverUrl + env.authRoutes.login;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const data = await res.json();
    if(!res.ok) {
        const error = new Error(data.message || 'Login failed');
        error.statusCode = res.status;
        throw error;
    }

    return data;
}
const registerController = async (payload) => {
    const url = env.serverUrl + env.authRoutes.register;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const data = await res.json();
    if(!res.ok) {
        const error = new Error(data.message || 'Registration failed');
        error.statusCode = res.status;
        throw error;
    }

    return data;
}

const authController = {
    loginController,
    registerController
}

export default authController;