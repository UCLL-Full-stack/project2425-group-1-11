const getAllAppointments = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/appointments`;
  
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
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

const AppointmentService = {
  getAllAppointments,
  deleteAppointment
};

export default AppointmentService;
