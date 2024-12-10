const getAllClinics = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/clinics`;
    
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  
  const ClinicService = {
    getAllClinics
  };
  
export default ClinicService;