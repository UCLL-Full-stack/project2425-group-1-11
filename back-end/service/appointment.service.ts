import { Appointment } from "../model/appointment";
import appointmentDb from "../repository/appointment.db";

const getAllAppointments = (): Appointment[] => appointmentDb.getAllAppointments();

const deleteAppointmentById = (id: number): void => appointmentDb.deleteAppointmentById(id);

export default { 
    getAllAppointments,
    deleteAppointmentById, 
};