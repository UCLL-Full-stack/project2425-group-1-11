import React from 'react';
import { Appointment } from '@types';
import { mutate } from 'swr';
import AppointmentService from '@services/AppointmentService';

type Props = {
  appointments: Array<Appointment>;
};

const AppointmentOverviewTable: React.FC<Props> = ({ appointments }: Props) => {

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
              <tr key={index} style={{ backgroundColor: isActiveAppointment(appointment.startDate) ? 'lightgreen' : 'inherit' }}>
                <td>{appointment.startDate}</td>
                <td>{appointment.endDate}</td>
                <td>{appointment.comment}</td>
                <td>{`${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`}</td>
                <td>
                  <button onClick={() => handleDelete(appointment.id)}>Cancel</button>
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
