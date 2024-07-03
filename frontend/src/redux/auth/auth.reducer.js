import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./auth.types";

// Retrieve token from localStorage
let token = localStorage.getItem("token");

// Check if token is retrieved correctly
console.log("Token from localStorage:", token);

// Initial state with token from localStorage
const initialState = {
    isAuth: !!token, // Consider initializing isAuth based on token presence
    token: token || "",
    data: [],
    loading: false,
    error: false,
    message: "",
};

// Reducer function
export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: payload.token,
                loading: false,
                error: false,
                message: "Login Successful",
            };
        case LOGIN_ERROR:
            return {
                ...state,
                isAuth: false,
                loading: false,
                error: true,
                message: payload.message,
            };
        case LOGOUT:
            localStorage.removeItem('token'); // Clear token from localStorage on logout
            return {
                ...state,
                isAuth: false,
                token: "",
                message: "Logged out successfully",
            };
        default:
            return state;
    }
};
