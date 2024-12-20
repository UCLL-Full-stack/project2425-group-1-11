import React, { useEffect, useState } from 'react';
import { Appointment, Doctor, User } from '@types';
import { mutate } from 'swr';
import AppointmentService from '@services/AppointmentService';
import useCurrentUserId from 'hook/useCurrentUserId';
import { useRouter } from "next/router";

type Props = {
  appointments: Array<Appointment>;
  deleteAppointment: (id: number) => void
};

const AppointmentOverviewTable: React.FC<Props> = ({ appointments, deleteAppointment }) => {
  const userId = useCurrentUserId();
  
  const handleDelete = async (id: number) => {
    const response = await AppointmentService.deleteAppointment(id);
    if (response.ok) {
      deleteAppointment(id)
      mutate('appointments', (appointments: Appointment[] = []) => 
        appointments.filter((appointment) => appointment.id !== id)
      , false);

      // Trigger SWR to re-fetch appointments and update the UI automatically
      mutate('appointments'); // Ensure this key matches your SWR fetching key
    } else {
      const errorText = await response.text();
      console.error("Failed to delete appointment:", errorText);
      alert(`Failed to delete appointment: ${errorText}`);
    }
  };

  const isActiveAppointment = (startDate: string) => {
    return new Date(startDate) > new Date();
  };

  const userAppointments = appointments.filter(appointment => (appointment.patient && appointment.patient.user.id === userId) || (appointment.doctor && appointment.doctor.user.id === userId));

  return (
    <>
      {userAppointments .length > 0 ? (
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
                <td>{new Date(appointment.startDate).toLocaleDateString()} {new Date(appointment.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{new Date(appointment.endDate).toLocaleDateString()} {new Date(appointment.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
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
      ) : (
        <p>No appointments found.</p>
      )}
    </>
  );
};

export default AppointmentOverviewTable;
