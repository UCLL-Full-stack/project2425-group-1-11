import UserService from "@services/UserService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const UserLoginForm: React.FC = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userNameError, setUserNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();
    const [loaded, setLoaded] = useState(false); 
    const { t } = useTranslation();
    

    useEffect(() => {
      // Mark as loaded after initial render and translations are ready
      setLoaded(true);
    }, []);

    const clearErrors = () => {
        setUserNameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;
        if (!userName && userName.trim() === "") {
          setUserNameError(t('login.validate.name'));
        result = false;
        }
        if (!password && password.trim() === "") {
          setPasswordError(t('login.validate.password'));
        result = false;
        }
        return result;
    };

    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    
        clearErrors();
    
        if (!validate()) {
          return;
        }

        // console.log('Logging in with:', { userName: userName, password }); 
    
        const user = { userName: userName, password };
        const response = await UserService.login(user);
    
        if (response.status === 200) {
          setStatusMessages([{ message: t('login.success'), type: 'success' }]);

          const user = await response.json();
          sessionStorage.setItem(
            'loggedInUser',
            JSON.stringify({
              token: user.token,
              id: user.id,
              userName: user.userName,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,              
            })
          );
      
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else if (response.status === 401) {
          const { errorMessage } = await response.json();
          setStatusMessages([{ message: errorMessage, type: 'error' }]);
        } else {
          setStatusMessages([
            {
              message: 'Invalid username or password.',
              type: 'error',
            },
          ]);
        }
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
        <h1>{loaded ? t('login.title') : 'Login'}</h1>

        <form onSubmit={handleLogin}>
            <label htmlFor="nameInput">
            {loaded ? t('login.label.username') : 'Username'}
            </label>
            <div>
            <input
                id="nameInput"
                type="text"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
            />
            {userNameError && <div className="text-red-800 ">{userNameError}</div>}
            </div>
            <div className="mt-2">
            <div>
                <label
                htmlFor="passwordInput"
                >{loaded ? t('login.label.password') : 'Password'}
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
            {loaded ? t('login.button') : 'Login'}
            </button>
        </form>
        </div>
    );
};
export default UserLoginForm;