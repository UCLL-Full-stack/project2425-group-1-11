const getAllPatients = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/patients`;
    
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  
  const PatientService = {
    getAllPatients
  };
  
export default PatientService;