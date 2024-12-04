import Header from "@components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Doctor } from "@types";
import DoctorService from "@services/DoctorService";
import DoctorOverviewTable from "@components/doctors/DoctorOverviewTable";

const Doctors: React.FC = () => {

    const [doctors, setDoctors] = useState<Doctor[]>([]);


    const getAllDoctors = async () => {
        const response = await DoctorService.getAllDoctors();
        const doctorsData = await response.json();
        setDoctors(doctorsData);
    }


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

                {doctors && (
                    <DoctorOverviewTable doctors={doctors}></DoctorOverviewTable>
                )}

                
                

            </main>
        </>
        );
    };
export default Doctors;