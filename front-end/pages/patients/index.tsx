import Header from "@components/header";
import PatientOverviewTable from "@components/patients/PatientOverviewTable";
import PatientService from "@services/PatientService";
import Head from "next/head";
import { useEffect, useState } from "react";
import type { Patient } from "@types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Patient: React.FC = () => {

    const [patients, setPatients] = useState<Patient[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
    const router = useRouter();
  
    useEffect(() => {
      const storedUser = sessionStorage.getItem("loggedInUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === 'admin') {
          setIsAdmin(true);
          getAllPatients();
        } else {
          setIsAuthorized(false); // Set unauthorized state
        }
      } else {
        setIsAuthorized(false); // Set unauthorized state if no user is logged in
      }
    }, [router]);
  
    const getAllPatients = async () => {
      const response = await PatientService.getAllPatients();
      const patientsData = await response.json();
      setPatients(patientsData);
    };

    return (
        <>
            <Head>
                <title>Patients</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Patients</h1>
                {!isAuthorized ? (
                   <div className="text-center text-red-800">
                   <h2>Patients overview</h2>
                   <p>Unauthorized to access this page.</p>
                   {/* <p>You do not have permission to view this page.</p> */}
                 </div>
        ) : (
          <>
            <section>
              <h2>Patients overview</h2>
            </section>
            {patients && (
              <PatientOverviewTable patients={patients}></PatientOverviewTable>
            )}
          </>
        )}
            </main>
        </>
        );
    };

    export const getServerSideProps = async ({ locale }: { locale: string }) => ({
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
    });
export default Patient;