import React, { useEffect, useState } from 'react';
import { Doctor } from '@types';
import { mutate } from 'swr';

type Props = {
  doctors: Array<Doctor>;
};

const DoctorOverviewTable: React.FC<Props> = ({ doctors }: Props) => {

  return (
    <>
      {doctors && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              {/* <th scope="col">Description</th>
              <th scope="col">Clinic</th> */}
            </tr>
          </thead>
          <tbody>
          {doctors.map((doctor: Doctor) => (
          <tr key={doctor.id}>
            <td>{doctor.user.firstName} {doctor.user.lastName}</td>
            <td>{doctor.department}</td>
            <td>{doctor.description}</td>
          </tr>
        ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default DoctorOverviewTable;