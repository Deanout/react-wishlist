// import axios
import { isRejectedWithValue } from '@reduxjs/toolkit';
import axios from './axios';

const LOGIN_URL = '/oauth/token';
const SIGNUP_URL = '/users';
const LOGOUT_URL = '/oauth/revoke'
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            withCredentials: true
        }
    }
    let data = {
            'email': email,
            'password': password,
            'client_id': CLIENT_ID,
        };
        // create axios promise that returns the caught error on reject

    return axios.post(SIGNUP_URL, data, config)
        .then((response:any) => {
            return response
        }).catch((error:any) => {
            return error.response
            
    });
}