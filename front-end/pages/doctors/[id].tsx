import Head from 'next/head';
import Header from '@components/header';
import DoctorService from '@services/DoctorService';
import { Doctor } from '@types';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type Props = {
  doctor: Doctor;
};

const DoctorDetails: React.FC<Props> = ({ doctor }) => {
    const router = useRouter();

  const handleBackClick = () => {
    router.push('/doctors');
  };
  return (
    <>
      <Head>
        <title>{doctor.user.firstName} {doctor.user.lastName}</title>
        <meta
          name="description"
          content={`Learn more about Dr. ${doctor.user.firstName} ${doctor.user.lastName}, a specialist in ${doctor.department}.`}
        />
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>{doctor.user.firstName} {doctor.user.lastName}</h1>
        <section>
          <h2>Department: {doctor.department}</h2>
          <p>Email: {doctor.user.email}</p>
        </section>
        <button onClick={handleBackClick} className="btn btn-success mt-4">Back to Doctors Overview</button>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  if (!id || !Number.isInteger(Number(id))) {
    return {
      notFound: true,
    };
  }

  try {
    const response = await DoctorService.getDoctorById(Number(id));
    if (!response.ok) {
      return {
        notFound: true,
      };
    }
    const doctor = await response.json();
    return {
      props: {
        doctor,
      },
    };
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return {
      notFound: true,
    };
  }
};

export default DoctorDetails;