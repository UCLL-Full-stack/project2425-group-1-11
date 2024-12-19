import React, { useEffect, useState } from 'react';
import { Record } from '@types';
import RecordService from '@services/RecordService';
import { mutate } from 'swr';
import useCurrentPatient from 'hook/useCurrentPatient';

type Props = {
  records: Array<Record>;
  deleteRecord: (id: number) => void
};

const RecordOverviewTable: React.FC<Props> = ({ records, deleteRecord }) => {
  const patient = useCurrentPatient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Record | null>(null);
  const [newDescription, setNewDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");


  const handleOpenModal = (record: Record) => {
    console.log("Opening modal for record:", record);
    setCurrentRecord(record);
    setNewDescription(record.description);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
    setNewDescription('');
  };

  const handleUpdate = async () => {
    if (!currentRecord) return;
  
    if (!newDescription) {
      alert("Description cannot be empty.");
      return;
    }
  
    const updatedRecord = { ...currentRecord, description: newDescription };
  
    try {
      if (currentRecord.id !== undefined) {
        const response = await RecordService.updateRecord(currentRecord.id, updatedRecord);
        if (!response.ok) {
          setErrorMessage("Failed to update the record.");
        } else {
          setSuccessMessage("Record updated successfully.");
          handleCloseModal();
          mutate('records'); // Refresh the records list
        }
      } else {
        setErrorMessage("Record ID is undefined.");
      }
    } catch (error) {
      console.error("Error updating the record:", error);
      setErrorMessage("Error updating the record.");
    }
  };
  

  const handleDelete = async (id: number) => {
    try {
      const response = await RecordService.deleteRecord(id);
      if (response.ok) {
        mutate('records');
        deleteRecord(id);
      } else {
        const errorText = await response.text();
        console.error("Failed to delete record:", errorText);
        setErrorMessage(`Failed to delete record: ${errorText}`);
      }
    } catch (error) {
      console.error("An error occurred while deleting the record", error);
    }
  };

  const patientRecords = patient?.records ?? [];

  return (
    <>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {patientRecords.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Delete</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          <tbody>
          {patientRecords.map((record: Record) => (
          <tr key={record.id}>
            <td>{record.title}</td>
            <td>{record.description}</td>
            <td>
              <button onClick={() => record.id !== undefined && handleDelete(record.id)}>Cancel</button>
            </td>
            <td><button onClick={() => handleOpenModal(record)}>Change</button></td>
          </tr>
        ))}
          </tbody>
        </table>
      ) : (
        <p>No records found.</p>
      )}

{isModalOpen && currentRecord && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
            <h4 className="text-xl font-semibold mb-4">Update {currentRecord.title}</h4>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="p-2 border rounded w-full mt-4"
            />
            <div className="flex justify-end mt-4">
              <button onClick={handleUpdate} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2">Save</button>
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecordOverviewTable;