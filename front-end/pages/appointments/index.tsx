import AppointmentOverviewTable from "@components/appointments/AppointmentOverviewTable";
import MakeAppointment from "@components/appointments/MakeAppointment";
import Header from "@components/header";
import AppointmentService from "@services/AppointmentService";
import { Appointment } from "@types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";

const Appointments: React.FC = () => {

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [showAppointmentForm, setShowAppointmentForm] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
    const [isPatient, setIsPatient] = useState<boolean>(false);

    const getAllAppointments = async () => {
        const response = await AppointmentService.getAllAppointments();

        if (!response.ok) {
            if (response.status === 401) {
              setIsAuthorized(false);
            }
          } else {
            const appointmentsData = await response.json();
            setAppointments(appointmentsData);
            setIsAuthorized(true)
        }
    };

    const handleDelete = (id: number) => {
        setAppointments((prevAppointments) => prevAppointments.filter(appointment => appointment.id !== id));
    }

    const handleAppointmentCreated = (newAppointment: Appointment) => {
        setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
    }

    useEffect(() => {
      const storedUser = sessionStorage.getItem("loggedInUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === "patient") {
          setIsPatient(true);
        }
      }
      getAllAppointments();
    }, []);

    return (
        <>
          <Head>
            <title>Appointments</title>
        <link rel="icon" href="/images/LVMed_logo.png" />
          </Head>
          <Header />
          <main className="d-flex flex-column justify-content-center align-items-center">
            <h1>Appointments</h1>
            {!isAuthorized ? (
                <div className="text-center text-red-800">
                <h2>Appointments overview</h2>
                <p>Unauthorized to access this page.</p>
                {/* <p>You do not have permission to view this page.</p> */}
              </div>
            ) : (
                  <>
                    <section>
                        <h2>Appointments overview</h2>
                    </section>

                    {appointments && (
                        <AppointmentOverviewTable appointments={appointments} deleteAppointment={handleDelete}></AppointmentOverviewTable>
                    )}
{/* 
                    <button
                      onClick={() => setShowAppointmentForm(!showAppointmentForm)}  
                    >
                      Make Appointment
                    </button> */}

              {isPatient && (
              <>
                <button onClick={() => setShowAppointmentForm(!showAppointmentForm)}>
                  {showAppointmentForm ? "Hide Form" : "Make Appointment"}
                </button>

                {showAppointmentForm && (
                  <MakeAppointment onAppointmentCreated={handleAppointmentCreated} />
                )}
              </>
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
export default Appointments;