import AppointmentOverviewTable from "@components/appointments/AppointmentOverviewTable";
import Header from "@components/header";
import AppointmentService from "@services/AppointmentService";
import { Appointment } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Appointments: React.FC = () => {

    const [appointments, setAppointments] = useState<Appointment[]>([]);


    const getAllAppointments = async () => {
        const response = await AppointmentService.getAllAppointments();
        const appointmentsData = await response.json();
        setAppointments(appointmentsData);
    }

    const handleDelete = async (id: number) => {
        const response = await AppointmentService.deleteAppointment(id)
        if (response.ok) {
            getAllAppointments()
        }
    }

    useEffect(() => {
        getAllAppointments();
    }, []);

    return (
        <>
            <Head>
                <title>Appointments</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Appointments</h1>
                <section>
                    <h2>Appointments overview</h2>
                </section>

                {appointments && (
                    <AppointmentOverviewTable appointments={appointments} deleteAppointment={handleDelete}></AppointmentOverviewTable>
                )}

            </main>
        </>
        );
    };
export default Appointments;