import axios from "axios";
import { USER_SIGNUP, USER_SIGNUP_ERROR, USER_LOADING } from "./userSignup.type";

const mainUrl = process.env.REACT_APP_MAIN_URL;

export const signupUser = (cred) => async(dispatch) => {
     await dispatch({type : USER_LOADING})
    // console.log(cred)
    try {
        let res =await axios.post(`${mainUrl}/users/signup`, cred)
       await dispatch({ type: USER_SIGNUP });

    } catch (err) {
        dispatch({ type: USER_SIGNUP_ERROR, payload: err.response.data.msg })
    }
};
