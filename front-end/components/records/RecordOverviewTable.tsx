import React, { useEffect, useState } from 'react';
import { Record } from '@types';
import RecordService from '@services/RecordService';
import useSWR, { mutate } from 'swr';
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
  const [allRecords, setAllRecords] = useState<Record[]>([])

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
        // } else {
        //   setSuccessMessage("Record updated successfully.");
        //   handleCloseModal();
        //   mutate('records'); // Refresh the records list
        //   window.location.reload();
        // }
        } else {
          setSuccessMessage("Record updated successfully.");
          setAllRecords((prevRecords) =>
            prevRecords.map((record) =>
              record.id === currentRecord.id ? { ...record, description: newDescription } : record
            )
          );
          handleCloseModal();
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
        mutate('records', (records: Record[] = []) => 
          records.filter((record) => record.id !== id), false);
        deleteRecord(id);
      } else {
        const errorText = await response.text();
        console.error("Failed to delete record:", errorText);
        setErrorMessage(`Failed to delete record: ${errorText}`);
      }
    } catch (error) {
      console.error("An error occurred while deleting the record", error);
    }
    console.log(allRecords)
  };

  useEffect(() => {
    setAllRecords(records);
  }, [records])



  return (
    <>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {allRecords.length > 0 ? (
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
          {allRecords.map((record: Record) => (
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
        <div className="modal-overlay">
          <div className="modal-container">
            <h4 className="modal-title">Update {currentRecord.title}</h4>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="modal-textarea"
              rows={4}
            />
            <div className="modal-actions">
              <button
                onClick={handleUpdate}
                className="modal-button modal-button-save"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="modal-button modal-button-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecordOverviewTable;