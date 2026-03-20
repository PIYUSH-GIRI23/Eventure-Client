"use server";

import userController from '../controllers/userController';


export async function volunteerProfileAction(payload) {
  try {
    const data = await userController.volunteerProfileController(payload);
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        events: data.user,
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



export async function managerProfileAction(payload) {
  try {
    const data = await userController.managerProfileController(payload);
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        events: data.user,
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

export async function getManagerDetailsAction(payload) {
  try {
    const data = await userController.managerDetailsController(payload);
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        user: data.user,
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

export async function getVolunteerDetailsAction(payload) {
  try {
    const data = await userController.volunteerDetailsController(payload);
    // Prepare response with potentially new tokens
    const response = {
      success: true,
      statusCode: 200,
      data: {
        user: data.user,
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

export async function updateVolunteerDetailsAction(payload) {
  try {
    const data = await userController.updateVolunteerController(payload);
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

export async function updateManagerDetailsAction(payload) {
  try {
    const data = await userController.updateManagerController(payload);
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

export async function deleteAccountAction(payload) {
    try {
        const data = await userController.deleteAccountController(payload);
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