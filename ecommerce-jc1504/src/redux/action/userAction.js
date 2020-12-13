import Axios from "axios";
import { api_url } from '../../helpers/api_url';

export const loginAction = (data) => {
    return{
        type: "LOGIN",
        payload: data,
    };
};
export const logoutAction = (data) => {
    return{
        type: "LOGOUT",
    };
};

export const keepLogin = (id) => {
    return(dispatch) => {
        // console.log("ini keeplogin")
        // console.log("id nya", id)
        Axios.get(`${api_url}/users/${id}`)
        .then((res) => {
            dispatch({
                type:"LOGIN",
                payload: res.data,
            })
            // console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };
};