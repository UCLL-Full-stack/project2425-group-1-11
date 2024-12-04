import { Appointment } from "../model/appointment";
import appointmentDb from "../repository/appointment.db";

const getAllAppointments = (): Promise<Appointment[]> => appointmentDb.getAllAppointments();

const deleteAppointmentById = ({ id }: { id: number }): Promise<void> => appointmentDb.deleteAppointmentById({ id });

export default { 
    getAllAppointments,
    deleteAppointmentById, 
};