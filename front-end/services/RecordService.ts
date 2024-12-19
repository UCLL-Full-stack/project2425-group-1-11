import { Record } from "@types";

  const getAllRecords = async () => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser).token : null;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/records`;
    
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
  };

  const deleteRecord = (id: number) => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser).token : null;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/records`;
  
    return fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,

      },
    });
  };

  const addRecord = (record: Record, id: number) => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser).token : null;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/records/add`;

    return fetch(`${apiUrl}/${id}`, {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(record),
    });
  };

  const updateRecord = async (id: number, record: Record) => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser).token : null;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    return fetch(apiUrl + `/records/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(record),
    });
  };
  
  const RecordService = {
    getAllRecords,
    deleteRecord,
    addRecord,
    updateRecord
  };
  
export default RecordService;