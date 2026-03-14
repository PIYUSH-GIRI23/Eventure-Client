"use server";

import eventController from "@/app/controllers/eventController";

export async function getAllEventsAction(payload) {
  try {
    const data = await eventController.getAllEvents(payload);
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        events: data.events,
        message: data.message,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }
    
    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}

export async function getSpecificEventAction(payload) {
  try {
    const data = await eventController.getSpecificEvent(payload);
    
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        event: data.event,
        message: data.message,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }

    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}

export async function rateEventAction(payload) {
  try {
    const data = await eventController.rateEvent(payload);
    
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        message: data.message,
        likes_count: data.likes_count,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }

    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}

export async function derateEventAction(payload) {
  try {
    const data = await eventController.derateEvent(payload);
    
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        message: data.message,
        likes_count: data.likes_count,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }

    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}

export async function bookmarkEventAction(payload) {
  try {
    const data = await eventController.bookmarkEvent(payload);
    
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 201,
      data: {
        message: data.message,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }

    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}

export async function debookmarkEventAction(payload) {
  try {
    const data = await eventController.debookmarkEvent(payload);
    
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        message: data.message,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }

    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}

export async function registerToEventAction(payload) {
  try {
    const data = await eventController.registerToEvent(payload);
    
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 201,
      data: {
        message: data.message,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }

    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}

export async function deregisterFromEventAction(payload) {
  try {
    const data = await eventController.deregisterFromEvent(payload);
    
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        message: data.message,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }

    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}

export async function getBookmarkedEventsAction(payload) {
  try {
    const data = await eventController.getBookmarkedEvents(payload);
    
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        events: data.data,
        message: data.message,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }

    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}

export async function getLikedEventsAction(payload) {
  try {
    const data = await eventController.getLikedEvents(payload);
    
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        events: data.data,
        message: data.message,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }

    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}

export async function getRegisteredEventsAction(payload) {
  try {
    const data = await eventController.getRegisteredEvents(payload);
    
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        events: data.data,
        message: data.message,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }

    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}

export async function getCreatedEventsAction(payload) {
  try {
    const data = await eventController.getCreatedEvents(payload);
    
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        events: data.data,
        message: data.message,
      }
    };

    // Include new tokens if they were refreshed
    if (data.new_access_token) {
      response.new_access_token = data.new_access_token;
    }
    if (data.new_refresh_token) {
      response.new_refresh_token = data.new_refresh_token;
    }

    return response;
  } 
  catch (err) {
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "An error occurred"
    };
  }
}