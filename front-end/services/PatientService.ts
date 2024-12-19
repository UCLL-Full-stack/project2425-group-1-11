const getAllPatients = async () => {
  const storedUser = sessionStorage.getItem("loggedInUser");
  const token = storedUser ? JSON.parse(storedUser).token : null;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/patients`;
  
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,

    }
  });
};

const getPatientByUserId = (id: number) => {
  const storedUser = sessionStorage.getItem("loggedInUser");
  const token = storedUser ? JSON.parse(storedUser).token : null;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/patients`;

  return fetch(`${apiUrl}/${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
  });
};

const PatientService = {
  getAllPatients,
  getPatientByUserId,
};
  
export default PatientService;