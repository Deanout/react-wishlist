import axios from "./axios";

const LOGIN_URL = "/oauth/token";
const SIGNUP_URL = "/users";
/**
 * TODO: Need to call revokeRefreshToken() when logout
 */
const LOGOUT_URL = "/oauth/revoke";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  let data = {
    email: email,
    password: password,
    client_id: CLIENT_ID,
  };

  return axios
    .post(SIGNUP_URL, data)
    .then((response: any) => {
      return JSON.parse(response);
    })
    .catch((error: any) => {
      return error.response;
    });
}

export async function loginWithEmailAndPassword(
  email: string,
  password: string
) {
  let data = {
    grant_type: "password",
    email: email,
    password: password,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axios
    .post(LOGIN_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function requestAccessTokenWithRefreshToken(refreshToken: string) {
  let data = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axios
    .post(LOGIN_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}
