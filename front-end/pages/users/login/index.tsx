import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/login/UserLoginForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Login: React.FC = () => {
    const users = [
        { username: 'irinalazar', password: 'irina8', role: 'patient' },
        { username: 'furquanmobeen', password: 'furquan12', role: 'patient' },
        { username: 'eddyndacasaba', password: 'eddy14', role: 'doctor' },
        { username: 'yonghoonkim', password: 'kim10', role: 'doctor' },
        { username: 'naphatpruekveeraparb', password: 'naphat420', role: 'admin' },
      ];
    return (
        <>
            <Head>
                <title>Login</title>
        <link rel="icon" href="/images/LVMed_logo.png" />
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
                </section>
                <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
            </main>
        </>
    );
};
export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
export default Login;
