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

  const handleDelete = async (id: number) => {
    try {
      const response = await RecordService.deleteRecord(id);
      if (response.ok) {
        // Remove the deleted record from the state
        deleteRecord(id);
        // Revalidate the records data
        mutate('records');
      } else {
        const errorText = await response.text();
        console.error("Failed to delete record:", errorText);
        alert(`Failed to delete record: ${errorText}`);
      }
    } catch (error) {
      console.error("An error occurred while deleting the record", error);
    }
  };

  const patientRecords = patient?.records ?? [];

  return (
    <>
      {patientRecords.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Delete</th>
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
          </tr>
        ))}
          </tbody>
        </table>
      ) : (
        <p>No records found for the logged-in patient.</p>
      )}
    </>
  );
};

export default RecordOverviewTable;