import React, { useEffect, useState } from 'react';
import { Appointment, Doctor, User } from '@types';
import { mutate } from 'swr';
import AppointmentService from '@services/AppointmentService';
import useCurrentUserId from 'hook/useCurrentUserId';

type Props = {
  appointments: Array<Appointment>;
  deleteAppointment: (id: number) => void
};

const AppointmentOverviewTable: React.FC<Props> = ({ appointments, deleteAppointment }) => {
  const userId = useCurrentUserId();
  
  const handleDelete = async (id: number) => {
    const response = await AppointmentService.deleteAppointment(id);
    if (response.ok) {
      // Trigger SWR to re-fetch appointments and update the UI automatically
      mutate('appointments'); // Ensure this key matches your SWR fetching key
    } else {
      const errorText = await response.text();
      console.error("Failed to delete appointment:", errorText);
      alert(`Failed to delete appointment: ${errorText}`);
    }
    deleteAppointment(id);
  };

  // Function to check if the appointment is active (in the future)
  const isActiveAppointment = (startDate: string) => {
    return new Date(startDate) > new Date();
  };

  const userAppointments = appointments.filter(appointment => appointment.patient && appointment.patient.id === userId);

  return (
    <>
      {userAppointments && (
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
            {userAppointments.map((appointment, index) => (
              <tr
                key={index}
                style={{
                  color: isActiveAppointment(appointment.startDate) ? 'green' : 'inherit',
                  fontWeight: 'bold',
                }}
              >                
                <td>{new Date(appointment.startDate).toLocaleDateString()}</td>
                <td>{new Date(appointment.endDate).toLocaleDateString()}</td>
                <td>{appointment.comment}</td>
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
