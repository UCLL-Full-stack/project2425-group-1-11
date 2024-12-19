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
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string>();
  const { t } = useTranslation();

  const getAllDoctors = async () => {
    setError("");
    const response = await DoctorService.getAllDoctors();

    if (!response.ok) {
      if (response.status === 401) {
        setError(t('doctors.error'));
      } else {
        setError(response.statusText);
      }
    } else {
      const doctors = await response.json();
      setDoctors(doctors);
    }
    setLoaded(true);
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <>
      <Head>
        <title>{loaded ? t('doctors.title') : 'Doctors'}</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>{loaded ? t('doctors.title') : 'Doctors'}</h1>
        <section>
          <h2>{loaded ? t('doctors.overview') : 'Doctors overview'}</h2>
        </section>

        {error && <div className="text-red-800">{t('doctors.error')}</div>}
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