const getAllRecords = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/records`;
    
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  
  const RecordService = {
    getAllRecords
  };
  
export default RecordService;