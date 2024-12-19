import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import useCurrentUserId from 'hook/useCurrentUserId';

const Home: React.FC = () => {

  const userId = useCurrentUserId();

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
      </main>
    </>
  );
};

export default Home;
