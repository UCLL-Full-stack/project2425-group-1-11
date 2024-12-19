import React, { useEffect, useState } from 'react';
import { Doctor } from '@types';
import { mutate } from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  doctors: Array<Doctor>;
};

const DoctorOverviewTable: React.FC<Props> = ({ doctors }: Props) => {

  const router = useRouter();

  const handleViewDetails = (id: number) => {
    router.push(`/doctors/${id}`);
  };

  return (
    <>
      {doctors && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
          {doctors.map((doctor: Doctor) => (
          <tr key={doctor.id} data-testid={doctor.id}>
            <td>{doctor.user.firstName} {doctor.user.lastName}</td>
            <td>{doctor.department}</td>
            <td>
              <button 
                onClick={() => doctor.id !== undefined && handleViewDetails(doctor.id)}
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default DoctorOverviewTable;