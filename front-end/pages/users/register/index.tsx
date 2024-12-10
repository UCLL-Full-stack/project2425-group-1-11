import Head from "next/head";
import Header from "@components/header";
// import UserLoginForm from "@components/users/RegisterForm";

const Register: React.FC = () => {
    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Register</h1>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    {/* <RegisterForm /> */}
                </section>
            </main>
        </>
    );
};
export default Register;
