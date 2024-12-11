import { Record } from "@types";

const getAllRecords = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/records`;
    
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  const deleteRecord = (id: number) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/records`;
  
    return fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const addRecord = (record: Record) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/records/add", {
        method: "POST",
  
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
    });
  };
  

  
  const RecordService = {
    getAllRecords,
    deleteRecord,
    addRecord
  };
  
export default RecordService;