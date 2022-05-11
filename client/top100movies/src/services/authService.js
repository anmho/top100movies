import config from "../config.json";
import { Buffer } from "buffer";

const tokensUrl = config.apiUrl + "/api/tokens";
const usersUrl = config.apiUrl + "/api/users";

export async function login(username, password) {
  try {
    const response = await fetch(tokensUrl, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(username + ":" + password).toString("base64"),
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getCurrentUser(username, token) {
  const url = usersUrl + `/${username}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

const auth = {
  login,
  getCurrentUser,
};
export default auth;
