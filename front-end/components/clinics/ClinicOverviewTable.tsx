import React, { useEffect, useState } from 'react';
import { Clinic } from '@types';
import { mutate } from 'swr';

type Props = {
  clinics: Array<Clinic>;
};

const ClinicOverviewTable: React.FC<Props> = ({ clinics }: Props) => {

  return (
    <>
      {clinics && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
          {clinics.map((clinic: Clinic) => (
          <tr key={clinic.id}>
            <td>{clinic.address}</td>
            <td>{clinic.contactNumber}</td>
            <td>{clinic.rating}</td>
          </tr>
        ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ClinicOverviewTable;