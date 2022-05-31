import config from "../config.json";
import auth from "./authService";

const apiEndpoint = config.apiUrl + "/api/users";

export async function getUsers() {
  const response = await fetch(apiEndpoint, {});

  // return users;
}

export async function updateUser(user) {
  const url = apiEndpoint + `/${user.username}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${auth.getToken()}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  });

  return response.status;
}

const userService = {
  getUsers,
  updateUser,
};

export default userService;
