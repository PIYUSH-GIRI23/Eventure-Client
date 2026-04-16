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

const managerDetailsController = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const username = payload.username;
    const tokens={
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.userRoutes.getManagerDetails
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

const volunteerDetailsController = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const username = payload.username;
    const tokens={
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.userRoutes.getVolunteerDetails
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

const updateManagerController = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const updateData = payload.updateData;
    const tokens={
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.userRoutes.updateManagerDetails

    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            tokens: JSON.stringify(tokens)
        },
        body: JSON.stringify(updateData),
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

const updateVolunteerController = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const updateData = payload.updateData;
    const tokens={
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.userRoutes.updateVolunteerDetails
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            tokens: JSON.stringify(tokens)
        },
        body: JSON.stringify(updateData),
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

const deleteAccountController = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const tokens={
        access_token,
        refresh_token
    }
    const deleteData = payload.deleteData;
    const url = env.serverUrl + env.userRoutes.deleteUser
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            tokens: JSON.stringify(tokens)
        },
        cache: 'no-store',
        body: JSON.stringify(deleteData)
    });
    const data = await res.json();
    if(!res.ok) {
        const error = new Error(data.message || 'Fetch Failed');
        error.statusCode = res.status;
        throw error;
    }

    const response = {
        ...data,
    };

    return response;
}

const getVolunteerDetailedInfo = async (payload) => {
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

const getMultipleVolunteersDetails = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const volunteerUsernames = payload.volunteerUsernames; // Array of usernames
    const tokens={
        access_token,
        refresh_token
    }
    console.log(payload)
    try {
        // Fetch details for all volunteers in parallel
        const promises = volunteerUsernames.map(async (username) => {
            try {
                const url = env.serverUrl + env.userRoutes.getVolunteerProfile + `/${username}`;
                console.log(url)
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        tokens: JSON.stringify(tokens)
                    },
                    cache: 'no-store',
                });

                const data = await res.json();
                console.log(data)
                if (res.ok && data.user) {
                    return {
                        ...data.user,
                        username: username,
                        status: 'success'
                    };
                } else {
                    return {
                        username: username,
                        status: 'failed'
                    };
                }
            } catch (error) {
                return {
                    username: username,
                    status: 'error'
                };
            }
        });

        const results = await Promise.all(promises);
        console.log(results)
        return {
            volunteers: results.filter(v => v.status === 'success'),
            errors: results.filter(v => v.status !== 'success')
        };
    } catch (error) {
        throw new Error('Failed to fetch volunteer details');
    }
}

const userController = {
    volunteerProfileController,
    managerProfileController,
    managerDetailsController,
    volunteerDetailsController,
    updateVolunteerController,
    updateManagerController,
    deleteAccountController,
    getVolunteerDetailedInfo,
    getMultipleVolunteersDetails
}

export default userController;