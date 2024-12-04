import React, { useEffect, useState } from 'react';
import { Appointment, Doctor, User } from '@types';
import { mutate } from 'swr';
import AppointmentService from '@services/AppointmentService';

type Props = {
  appointments: Array<Appointment>;
  deleteAppointment: (id: number) => void
};

const AppointmentOverviewTable: React.FC<Props> = ({ appointments, deleteAppointment }: Props) => {

  const handleDelete = async (id: number) => {
    deleteAppointment(id)
  };

  // Function to check if the appointment is active (in the future)
  const isActiveAppointment = (startDate: string) => {
    return new Date(startDate) > new Date();
  };

  return (
    <>
      {appointments && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Start date</th>
              <th scope="col">End date</th>
              <th scope="col">Comments</th>
              <th scope="col">Doctor</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} style={{ color: isActiveAppointment(appointment.startDate) ? 'lightgreen' : 'inherit' }}>
                <td>{appointment.startDate}</td>
                <td>{appointment.endDate}</td>
                <td>{appointment.comment}</td>
                {/* <td>{`${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`}</td> */}
                <td>
                  {appointment.doctor && appointment.doctor.user
                    ? `${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`
                    : 'Unknown Doctor'}
                </td>
                <td>
                  <button onClick={() => appointment.id !== undefined && handleDelete(appointment.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AppointmentOverviewTable;
