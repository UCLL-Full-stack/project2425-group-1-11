import React, { useEffect, useState } from 'react';
import { Record } from '@types';
import { mutate } from 'swr';
import RecordService from '@services/RecordService';

type Props = {
  records: Array<Record>;
};

const RecordOverviewTable: React.FC<Props> = ({ records }: Props) => {

  const handleDelete = async (id: number) => {
    RecordService.deleteRecord(id);
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