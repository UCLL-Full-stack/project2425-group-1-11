import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import UserService from "../../services/UserService"; // Adjust the path as necessary
import { mutate } from "swr";
import { useTranslation } from "next-i18next";

const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role] = useState<string>("patient"); // Set role to "patient"
  const [status, setStatus] = useState<string>("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [fnameError, setFirstNameError] = useState<string>("");
  const [lnameError, setLastNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const { t } = useTranslation();
  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   setLoaded(true);
  // }, []);

  const router = useRouter();

  const validateForm = () => {
    setUsernameError("");
    setEmailError("");
    setFirstNameError("");
    setLastNameError("");
    setPasswordError("");

    let isValidForm = true;

    if (username === "" || username.trim() === "") {
      setUsernameError(t('register.validation.usernameRequired'));
      isValidForm = false;
    }

    if (email === "" || email.trim() === "") {
      setEmailError(t('register.validation.emailRequired'));
      isValidForm = false;
    }

    if (firstName === "" || firstName.trim() === "") {
      setFirstNameError(t('register.validation.firstNameRequired'));
      isValidForm = false;
    }

    if (lastName === "" || lastName.trim() === "") {
      setLastNameError(t('register.validation.lastNameRequired'));
      isValidForm = false;
    }

    if (password === "" || password.trim() === "") {
      setPasswordError(t('register.validation.passwordRequired'));
      isValidForm = false;
    }

    return isValidForm;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await UserService.registerUser({
        userName: username,
        email,
        firstName,
        lastName,
        password,
        role,
      });

      if (response.ok) {
        setStatus(t('register.status.success'));
        // Revalidate the user data
        mutate('users');
        router.push("/login");
      } else {
        setStatus(t('register.status.failure'));
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      setStatus(t('register.status.error'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit} >
      <div>
        <label htmlFor="username">{t('register.username')}</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)
          }
        />
        {usernameError && <p>{usernameError}</p>}
      </div>
      <div>
        <label htmlFor="email">{t('register.email')}</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p>{emailError}</p>}
      </div>
      <div>
        <label htmlFor="firstName">{t('register.firstName')}</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {fnameError && <p>{fnameError}</p>}
      </div>
      <div>
        <label htmlFor="lastName">{t('register.lastName')}</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {lnameError && <p>{lnameError}</p>}
      </div>
      <div>
        <label htmlFor="password">{t('register.password')}</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p>{passwordError}</p>}
      </div>
      <button type="submit">
      {t('register.submit')}
      </button>
      {status && <p>{status}</p>}
    </form>
    </div>
  );
};

export default RegisterForm;