import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

const UserLoginForm: React.FC = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();
    const clearErrors = () => {
        setNameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };
    const validate = (): boolean => {
        let result = true;
        if (!name && name.trim() === "") {
        setNameError("Name is required");
        result = false;
        }
        if (!password && password.trim() === "") {
        setPasswordError("Password is required");
        result = false;
        }
        return result;
    };
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        clearErrors();
        if (!validate()) {
        return;
        }
        setStatusMessages([
        {
            message: `Login succesful. Redirecting to homepage...`,
            type: "success",
        },
        ]);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
        router.push("/");
        }, 2000);
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {statusMessages && (
            <div className="row">
            <ul>
                {statusMessages.map(({ message, type }, index) => (
                <li
                    key={index}
                    className={classNames({
                    "text-red-800": type === "error",
                    "text-green-800": type === "success",
                    })}
                >
                    {message}
                </li>
                ))}
            </ul>
            </div>
        )}
        <form onSubmit={handleSubmit}>
            <label htmlFor="nameInput">
            Username:
            </label>
            <div>
            <input
                id="nameInput"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            {nameError && <div className="text-red-800 ">{nameError}</div>}
            </div>
            <div className="mt-2">
            <div>
                <label
                htmlFor="passwordInput"
                >
                Password
                </label>
            </div>
            <div>
                <input
                id="passwordInput"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
                {passwordError && (
                <div className=" text-red-800">{passwordError}</div>
                )}
            </div>
            </div>
            <button
            type="submit"
            >
            Login
            </button>
        </form>
        </div>
    );
};
export default UserLoginForm;