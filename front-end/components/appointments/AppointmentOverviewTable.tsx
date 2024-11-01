import React from 'react';
import { Appointment } from '@types';

type Props = {
  appointments: Array<Appointment>;
};

const AppointmentOverviewTable: React.FC<Props> = ({ appointments}: Props) => {
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
              <tr key={index} role="button">
                <td>{appointment.startDate}</td>
                <td>{appointment.endDate}</td>
                <td>{appointment.comment}</td>
                <td>{appointment.doctor.user.firstName} {appointment.doctor.user.lastName}</td>
                <td>
                  <button>Cancel</button>
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
