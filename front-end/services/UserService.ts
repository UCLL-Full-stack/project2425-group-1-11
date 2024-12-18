import { User } from "@types";

const registerUser = (user: User) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // const token = sessionStorage.getItem("authToken");
    console.log("Payload sent to API:", user);
    return fetch(apiUrl + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
};

const login = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  });
};

const UserService = {
    registerUser,
    login
  };
  
  export default UserService;