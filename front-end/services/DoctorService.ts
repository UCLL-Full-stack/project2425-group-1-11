const getAllDoctors = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/doctors`;
    
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  
  const DoctorService = {
    getAllDoctors
  };
  
export default DoctorService;
  