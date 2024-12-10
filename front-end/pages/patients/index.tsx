import Header from "@components/header";
import PatientOverviewTable from "@components/patients/PatientOverviewTable";
import PatientService from "@services/PatientService";
import Head from "next/head";
import { useEffect, useState } from "react";
import type { Patient } from "@types";

const Patient: React.FC = () => {

    const [patients, setPatients] = useState<Patient[]>([]);


    const getAllPatients = async () => {
        const response = await PatientService.getAllPatients();
        const patientsData = await response.json();
        setPatients(patientsData);
    }


    useEffect(() => {
        getAllPatients();
    }, []);

    return (
        <>
            <Head>
                <title>Patients</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Patients</h1>
                <section>
                    <h2>Patients overview</h2>
                </section>

                {patients && (
                    <PatientOverviewTable patients={patients}></PatientOverviewTable>
                )}

                
                

            </main>
        </>
        );
    };
export default Patient;