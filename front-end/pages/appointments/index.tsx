import AppointmentOverviewTable from "@components/appointments/AppointmentOverviewTable";
import MakeAppointment from "@components/appointments/MakeAppointment";
import Header from "@components/header";
import AppointmentService from "@services/AppointmentService";
import { Appointment } from "@types";
import useCurrentUser from "hook/useCurrentUserId";
import Head from "next/head";
import { useEffect, useState } from "react";

const Appointments: React.FC = () => {

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [showAppointmentForm, setShowAppointmentForm] = useState<boolean>(false);

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

    const handleAppointmentCreated = (newAppointment: Appointment) => {
        setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
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


                <button
                    onClick={() => setShowAppointmentForm(!showAppointmentForm)}
                    
                >
                  Make Appointment
                </button>

                {showAppointmentForm && (
                  <div className="w-full max-w-md">
                    <MakeAppointment onAppointmentCreated={handleAppointmentCreated}></MakeAppointment>
                  </div>
              )}

            </main>
        </>
        );
    };
export default Appointments;