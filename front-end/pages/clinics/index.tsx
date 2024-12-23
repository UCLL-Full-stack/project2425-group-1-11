import Header from "@components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import ClinicService from "@services/ClinicService";
import type { Clinic } from "@types"; // Adjust the import path as necessary
import ClinicOverviewTable from "@components/clinics/ClinicOverviewTable";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Clinic: React.FC = () => {

    const [clinics, setClinics] = useState<Clinic[]>([]);


    const getAllClinics = async () => {
        const response = await ClinicService.getAllClinics();
        const clinicsData = await response.json();
        setClinics(clinicsData);
    }


    useEffect(() => {
        getAllClinics();
    }, []);

    return (
        <>
            <Head>
                <title>Clinics</title>
        <link rel="icon" href="/images/LVMed_logo.png" />
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Clinics</h1>
                <section>
                    <h2>Clinics overview</h2>
                </section>

                {clinics && (
                    <ClinicOverviewTable clinics={clinics}></ClinicOverviewTable>
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
export default Clinic;