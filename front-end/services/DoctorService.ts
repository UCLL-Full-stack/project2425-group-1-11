const getAllDoctors = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/doctors`;
    
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  const getDoctorById = async (id: number) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`;
    
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  
  const DoctorService = {
    getAllDoctors,
    getDoctorById
  };
  
export default DoctorService;
  