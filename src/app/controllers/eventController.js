import {env} from '@/app/init/env';

const createEvent = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const tokens = {
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.eventRoutes.createEvent;
    
    // Create FormData
    const formData = new FormData();
    
    // Add image if provided
    if (payload.image) {
        formData.append('image', payload.image);
    }
    
    // Add body data as JSON string
    formData.append('data', JSON.stringify(payload.bodyData));
    
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            tokens: JSON.stringify(tokens)
        },
        body: formData,
        cache: 'no-store',
    });

    const data = await res.json();
    if(!res.ok) {
        throw new Error(data.message || 'Failed to create event');
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

const getAllEvents = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const tokens={
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.eventRoutes.getAllEvents;
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

const getSpecificEvent = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const eventId = payload.eventId;
    const tokens={
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.eventRoutes.specificEvent + `/${eventId}`;
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

const rateEvent = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const tokens={
        access_token,
        refresh_token
    }
    const { access_token: _, refresh_token: __, ...bodyData } = payload;
    const url = env.serverUrl + env.eventRoutes.rateEvent;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            tokens: JSON.stringify(tokens)
        },
        body: JSON.stringify(bodyData),
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

const derateEvent = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const tokens={
        access_token,
        refresh_token
    }
    const { access_token: _, refresh_token: __, ...bodyData } = payload;
    const url = env.serverUrl + env.eventRoutes.derateEvent;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            tokens: JSON.stringify(tokens)
        },
        body: JSON.stringify(bodyData),
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

const bookmarkEvent = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const tokens={
        access_token,
        refresh_token
    }
    const { access_token: _, refresh_token: __, ...bodyData } = payload;
    const url = env.serverUrl + env.eventRoutes.bookmarkEvent;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            tokens: JSON.stringify(tokens)
        },
        body: JSON.stringify(bodyData),
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

const debookmarkEvent = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const tokens={
        access_token,
        refresh_token
    }
    const { access_token: _, refresh_token: __, ...bodyData } = payload;
    const url = env.serverUrl + env.eventRoutes.debookmarkEvent;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            tokens: JSON.stringify(tokens)
        },
        body: JSON.stringify(bodyData),
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

const registerToEvent = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const tokens={
        access_token,
        refresh_token
    }
    const { access_token: _, refresh_token: __, ...bodyData } = payload;
    const url = env.serverUrl + env.eventRoutes.registerEvent;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            tokens: JSON.stringify(tokens)
        },
        body: JSON.stringify(bodyData),
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

const deregisterFromEvent = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const tokens={
        access_token,
        refresh_token
    }
    const { access_token: _, refresh_token: __, ...bodyData } = payload;
    const url = env.serverUrl + env.eventRoutes.deregisterEvent;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            tokens: JSON.stringify(tokens)
        },
        body: JSON.stringify(bodyData),
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

const getBookmarkedEvents = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const type = payload.type;
    const tokens = {
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.eventRoutes.getBookmarkedEvents + `/${type}`;
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

const getLikedEvents = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const type = payload.type;
    const tokens = {
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.eventRoutes.getLikedEvents + `/${type}`;
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

const getRegisteredEvents = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const type = payload.type;
    const tokens = {
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.eventRoutes.getRegisteredEvents + `/${type}`;
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

const getCreatedEvents = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const type = payload.type;
    const tokens = {
        access_token,
        refresh_token
    }
    const url = env.serverUrl + env.eventRoutes.getCreatedEvents + `/${type}`;
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

const uploadImage = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const image = payload.image;
    const event_id = payload.event_id;

    const tokens = {
        access_token,
        refresh_token
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('image', image);
    formData.append('event_id', event_id);

    const url = env.serverUrl + env.eventRoutes.uploadPhoto;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            tokens: JSON.stringify(tokens)
        },
        body: formData,
        cache: 'no-store',
    })
    let data;
    try {
        data = await res.json();
    } catch (err) {
        const error = new Error('Server error: Invalid response format');
        error.statusCode = res.status || 500;
        throw error;
    }

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

const uploadVideo = async (payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;
    const video = payload.video;
    const event_id = payload.event_id;

    const tokens = {
        access_token,
        refresh_token
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('video', video);
    formData.append('event_id', event_id);

    const url = env.serverUrl + env.eventRoutes.uploadVideo;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            tokens: JSON.stringify(tokens)
        },
        body: formData,
        cache: 'no-store',
    });

    let data;
    try {
        data = await res.json();
    } catch (err) {
        const error = new Error('Server error: Invalid response format');
        error.statusCode = res.status || 500;
        throw error;
    }

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

const eventsController = {
    createEvent,
    getAllEvents,
    getSpecificEvent,
    rateEvent,
    derateEvent,
    bookmarkEvent,
    debookmarkEvent,
    registerToEvent,
    deregisterFromEvent,
    getBookmarkedEvents,
    getLikedEvents,
    getRegisteredEvents,
    getCreatedEvents,
    uploadImage,
    uploadVideo,
}
export default eventsController;