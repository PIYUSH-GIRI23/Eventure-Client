import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    type:"volunteer", // manager or volunteer
    email : '',
    contact : '',
    firstName : '',
    lastName : '',
    lastLogin : null,
    dateOfJoining : null,
    dateOfBirth : null, 
    country : '',
    city : '',
    pinCode : '',
}
const userdataSlice = createSlice({
    name: "userdata",
    initialState,
    reducers : {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.contact = action.payload.contact;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.lastLogin = action.payload.lastLogin;
            state.dateOfJoining = action.payload.dateOfJoining;
            state.dateOfBirth = action.payload.dateOfBirth;
            state.country = action.payload.country;
            state.city = action.payload.city;
            state.pinCode = action.payload.pinCode;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.email = '';
            state.contact = '';
            state.firstName = '';
            state.lastName = '';
            state.lastLogin = null;
            state.dateOfJoining = null;
            state.dateOfBirth = null; 
            state.country = '';
            state.city = '';
            state.pinCode = '';
        },
        changeType : (state, action) => {
            state.type = action.payload.type;
        }
    }
})

export const { login, logout, changeType } = userdataSlice.actions;
export default userdataSlice.reducer;