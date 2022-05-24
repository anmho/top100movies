import config from "../config.json";
import { Buffer } from "buffer";

const tokensUrl = config.apiUrl + "/api/tokens";
const usersUrl = config.apiUrl + "/api/users";

// Logs in the user if successful, else return null, throw error,

const TOKEN_KEY = "token";
const USERNAME_KEY = "username";

export async function login(username, password) {
  const response = await fetch(tokensUrl, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(username + ":" + password).toString("base64"),
    },
  });

  if (!response.ok) return false;

  // Get token
  const { token } = await response.json();
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("username", username);
  console.log(token);
  return true;
}

export async function getCurrentUser() {
  const token = localStorage.getItem(TOKEN_KEY);
  const username = localStorage.getItem(USERNAME_KEY);
  if (!token || !username) return null;

  const url = usersUrl + `/${username}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) return null;

  const user = await response.json();
  return user;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

const auth = {
  login,
  getCurrentUser,
  logout,
};
export default auth;
