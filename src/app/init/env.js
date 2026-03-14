const ENV = process.env.NODE_ENV || 'development';
const isDevelopment = ENV === 'development';

export const env = {
    env: ENV,
    serverUrl: isDevelopment
        ? process.env.LOCAL_SERVER_URL
        : process.env.CLOUD_SERVER_URL,

    authRoutes: {
        login: process.env.LOGIN_ROUTE,
        register: process.env.SIGNUP_ROUTE
    },

    userRoutes: {
        deleteUser: process.env.DELETE_USER_ROUTE,
        getVolunteerDetails: process.env.GET_VOLUNTEER_DETAILS_ROUTE,
        getManagerDetails: process.env.GET_MANAGER_DETAILS_ROUTE,
        updateManagerDetails: process.env.UPDATE_MANAGER_DETAILS_ROUTE,
        updateVolunteerDetails: process.env.UPDATE_VOLUNTEER_DETAILS_ROUTE,
        getVolunteerProfile: process.env.GET_VOLUNTEER_PROFILE_ROUTE,
        getManagerProfile: process.env.GET_MANAGER_PROFILE_ROUTE
    },

    eventRoutes: {
        createEvent: process.env.CREATE_EVENT_ROUTE,
        registerEvent: process.env.REGISTER_EVENT_ROUTE,
        deregisterEvent: process.env.DEREGISTER_EVENT_ROUTE,
        bookmarkEvent: process.env.BOOKMARK_EVENT_ROUTE,
        debookmarkEvent: process.env.DEBOOKMARK_EVENT_ROUTE,
        rateEvent: process.env.RATE_EVENT_ROUTE,
        derateEvent: process.env.DERATE_EVENT_ROUTE,
        getAllEvents: process.env.GET_ALL_EVENTS_ROUTE,
        specificEvent: process.env.SPECIFIC_EVENT_ROUTE,
        uploadPhoto: process.env.UPLOAD_PHOTO_ROUTE,
        uploadVideo: process.env.UPLOAD_VIDEO_ROUTE,
        getBookmarkedEvents: process.env.GET_BOOKMARKED_EVENTS_ROUTE,
        getLikedEvents: process.env.GET_LIKED_EVENTS_ROUTE,
        getRegisteredEvents: process.env.GET_REGISTERED_EVENTS_ROUTE,
        getCreatedEvents: process.env.GET_CREATED_EVENTS_ROUTE
    },

    limits: {
        image_limit: Number(process.env.IMAGE_LIMIT) || 10,
        video_limit: Number(process.env.VIDEO_LIMIT) || 3,
        image_size_limit: Number(process.env.IMAGE_SIZE_LIMIT) || 5,
        video_size_limit: Number(process.env.VIDEO_SIZE_LIMIT) || 20
    },

    folderName: process.env.FOLDER_NAME || "eventureAI"
};