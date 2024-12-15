import React, { useEffect, useState } from 'react';
import { Record } from '@types';
import RecordService from '@services/RecordService';
import { mutate } from 'swr';

type Props = {
  records: Array<Record>;
};

const RecordOverviewTable: React.FC<Props> = ({ records }: Props) => {

  const handleDelete = async (id: number) => {
    try {
      const response = await RecordService.deleteRecord(id);
      if (response.ok) {
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

  return (
    <>
      {records && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
          {records.map((record: Record) => (
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
      )}
    </>
  );
};

export default RecordOverviewTable;