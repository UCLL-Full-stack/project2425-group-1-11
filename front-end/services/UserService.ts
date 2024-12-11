import { User, UserLogin } from "@types";

const registerUser = (user: User) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // const token = sessionStorage.getItem("authToken");
    return fetch(apiUrl + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
};

const login = async ({username, password}: UserLogin) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    sessionStorage.setItem("username", username);
  
    return fetch(apiUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  };

const UserService = {
    registerUser,
    login
  };
  
  export default UserService;