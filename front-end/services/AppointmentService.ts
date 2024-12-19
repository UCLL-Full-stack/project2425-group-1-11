import { Appointment } from "@types";

const getAllAppointments = async () => {
  const storedUser = sessionStorage.getItem("loggedInUser");
  const token = storedUser ? JSON.parse(storedUser).token : null;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/appointments`;
  
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });
};

const deleteAppointment = (id: number) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/appointments`;

  return fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const makeAppointment = (appointment: Appointment) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/appointments/add", {
      method: "POST",

      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
  });
};

const AppointmentService = {
  getAllAppointments,
  deleteAppointment,
  makeAppointment
};

export default AppointmentService;
