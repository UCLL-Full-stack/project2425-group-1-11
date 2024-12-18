const getAllPatients = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/patients`;
    
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  const getPatientByUserId = (id: number) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/patients`;

    return fetch(`${apiUrl}/${id}`, {
        method: "GET",
  
        headers: {
            "Content-Type": "application/json",
        },
    });
  };
  
  const PatientService = {
    getAllPatients,
    getPatientByUserId,
  };
  
export default PatientService;