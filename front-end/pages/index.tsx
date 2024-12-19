import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import useCurrentUserId from 'hook/useCurrentUserId';

const Home: React.FC = () => {

  const userId = useCurrentUserId();

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
        <title>LVMed</title>
        <meta name="description" content="LVMed app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/LVMed_logo.png" />
      </Head>
      <Header />
      <main className={styles.main}>
        {/* <span> */}
        <Image
            src="/images/LVMed_logo.png"
            alt="LVMed Logo"
            width={350} 
            height={350} 
          />
          {/* <h1>Welcome!</h1> */}
        {/* </span> */}
        <div>
          <p>
            The medical appointments app lets you manage your appointments as a user. <br />
            You can also choose your doctor and manage your medical records.
          </p>
        </div>
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

export default Home;
