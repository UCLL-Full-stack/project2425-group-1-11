import AppointmentOverviewTable from "@components/appointments/AppointmentOverviewTable";
import MakeAppointment from "@components/appointments/MakeAppointment";
import Header from "@components/header";
import AppointmentService from "@services/AppointmentService";
import { Appointment } from "@types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";
import { mutate } from "swr";

const Appointments: React.FC = () => {

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [showAppointmentForm, setShowAppointmentForm] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const interval = setInterval(() => {
          mutate('appointments');
        }, 5000); // Refresh every 5 seconds
    
        return () => clearInterval(interval);
      }, []);

    const getAllAppointments = async () => {
        setError("");
        const response = await AppointmentService.getAllAppointments();

        if (!response.ok) {
            if (response.status === 401) {
                setError("Unauthorized.");
            } else {
              setError(response.statusText);
            }
          } else {
            const appointmentsData = await response.json();
            setAppointments(appointmentsData);
          }
    };

    const handleDelete = (id: number) => {
        setAppointments((prevAppointments) => prevAppointments.filter(appointment => appointment.id !== id));
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
                {error && <div className="text-red-800">{error}</div>}
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

    export const getServerSideProps = async ({ locale }: { locale: string }) => ({
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
    });
export default Appointments;