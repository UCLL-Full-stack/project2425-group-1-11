import Head from "next/head";
import Header from "@components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useTranslation } from "react-i18next";
import UserLoginForm from "@components/users/UserLoginForm";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Login</h1>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
                </section>
            </main>
        </>
    );
};
export default Login;
