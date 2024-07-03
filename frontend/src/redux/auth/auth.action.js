import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./auth.types";
import { BaseUrl } from "../../utils/helper";

export const login = (creds) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const response = await fetch(`${BaseUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
        });
        const data = await response.json();
        if (!data.error) {
            // Assuming data.token is received from server on successful login
            // localStorage.setItem("token", data.token); 
            // Store token in localStorage
            dispatch({ type: LOGIN_SUCCESS, payload: data });
        } else {
            dispatch({ type: LOGIN_ERROR, payload: data.error });
        }
        return data; // Return data for further processing if needed
    } catch (error) {
        dispatch({ type: LOGIN_ERROR, payload: error.message });
        console.log(error);
        throw error; // Optionally rethrow the error for higher-level error handling
    }
};

const authlogout = () => async(dispatch) => {
    dispatch({type: LOGOUT, payload: "Logout Successfull!"})
}

export default authlogout;