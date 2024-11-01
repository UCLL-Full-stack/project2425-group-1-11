const getAllAppointments = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/appointments";
  
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    });
};

const AppointmentService = {
    getAllAppointments
};

export default AppointmentService;