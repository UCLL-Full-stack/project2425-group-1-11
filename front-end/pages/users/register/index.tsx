import Head from "next/head";
import Header from "@components/header";
import RegisterForm from "@components/register/RegisterForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


const Register: React.FC = () => {
    return (
        <>
            <Head>
                <title>Register</title>
        <link rel="icon" href="/images/LVMed_logo.png" />
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Register</h1>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <RegisterForm />
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
export default Register;
