import React, { useEffect, useState } from 'react';
import { Clinic, Doctor } from '@types';
import { mutate } from 'swr';

type Props = {
  clinics: Array<Clinic>;
};

const ClinicOverviewTable: React.FC<Props> = ({ clinics }: Props) => {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  const handleClinicClick = (clinic: Clinic) => {
    setSelectedClinic(clinic);
  };

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
          <tr key={clinic.id} onClick={() => handleClinicClick(clinic)} style={{ cursor: 'pointer' }}>
            <td>{clinic.address}</td>
            <td>{clinic.contactNumber}</td>
            <td>{clinic.rating}</td>
          </tr>
        ))}
          </tbody>
        </table>
      )}
      {selectedClinic && (
        <div>
          <h3>Doctors at {selectedClinic.address}</h3>
          {selectedClinic.doctors.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Department</th>
                </tr>
              </thead>
              <tbody>
                {selectedClinic.doctors.map((doctor: Doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.user.firstName} {doctor.user.lastName}</td>
                    <td>{doctor.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No doctors found for this clinic.</p>
          )}
        </div>
      )}
    </>
  );
};

export default ClinicOverviewTable;