import Header from "@components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Doctor } from "@types";
import DoctorService from "@services/DoctorService";
import DoctorOverviewTable from "@components/doctors/DoctorOverviewTable";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<string>();

  const getAllDoctors = async () => {
    setError("");
    const response = await DoctorService.getAllDoctors();

    if (!response.ok) {
      if (response.status === 401) {
        setError("Not authorized to access.");
      } else {
        setError(response.statusText);
      }
    } else {
      const doctors = await response.json();
      setDoctors(doctors);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <>
      <Head>
        <title>Doctors</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Doctors</h1>
        <section>
          <h2>Doctors overview</h2>
        </section>

        {error && <div className="text-red-800">{error}</div>}
        {doctors && (
          <DoctorOverviewTable doctors={doctors}></DoctorOverviewTable>
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Doctors;