import React, { useEffect, useState } from 'react';
import { Record } from '@types';
import { mutate } from 'swr';

type Props = {
  records: Array<Record>;
};

const RecordOverviewTable: React.FC<Props> = ({ records }: Props) => {

  return (
    <>
      {records && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
          {records.map((record: Record) => (
          <tr key={record.id}>
            <td>{record.title}</td>
            <td>{record.description}</td>
          </tr>
        ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default RecordOverviewTable;