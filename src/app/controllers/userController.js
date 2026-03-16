import {env} from '@/app/init/env';

const volunteerProfileController = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const username = payload.username;
    const tokens={
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.userRoutes.getVolunteerProfile + `/${username}`;
    
   const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            tokens: JSON.stringify(tokens)
        },
        cache: 'no-store',
    });

    const data = await res.json();
    if(!res.ok) {
        const error = new Error(data.message || 'Fetch Failed');
        error.statusCode = res.status;
        throw error;
    }

    // Extract new tokens from response headers if they exist
    const newAccessToken = res.headers.get('New-Access-Token');
    const newRefreshToken = res.headers.get('New-Refresh-Token');

    const response = {
        ...data,
    };

    if (newAccessToken) response.new_access_token = newAccessToken;
    if (newRefreshToken) response.new_refresh_token = newRefreshToken;

    return response;
}
const managerProfileController = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const username = payload.username;
    const tokens={
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.userRoutes.getManagerProfile + `/${username}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            tokens: JSON.stringify(tokens)
        },
        cache: 'no-store',
    });

    const data = await res.json();
    if(!res.ok) {
        const error = new Error(data.message || 'Fetch Failed');
        error.statusCode = res.status;
        throw error;
    }

    // Extract new tokens from response headers if they exist
    const newAccessToken = res.headers.get('New-Access-Token');
    const newRefreshToken = res.headers.get('New-Refresh-Token');

    const response = {
        ...data,
    };

    if (newAccessToken) response.new_access_token = newAccessToken;
    if (newRefreshToken) response.new_refresh_token = newRefreshToken;

    return response;
}

const userController = {
    volunteerProfileController,
    managerProfileController
}

export default userController;