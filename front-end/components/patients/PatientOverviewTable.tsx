import React, { useEffect, useState } from 'react';
import { Patient } from '@types';
import { mutate } from 'swr';

type Props = {
  patients: Array<Patient>;
};

const PatientOverviewTable: React.FC<Props> = ({ patients }: Props) => {

  return (
    <>
      {patients && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Records</th>
            </tr>
          </thead>
          <tbody>
          {patients.map((patient: Patient) => (
          <tr key={patient.id}>
            <td>{patient.user.firstName} {patient.user.lastName}</td>
            <td>{patient.records ? patient.records.length : 'No records'}</td>
          </tr>
        ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PatientOverviewTable;