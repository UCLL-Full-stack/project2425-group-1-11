const getAllDoctors = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/doctors`;
    const storedUser = sessionStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser).token : null;
    
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
  