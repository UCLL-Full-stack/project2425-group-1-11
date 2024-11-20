import { Appointment } from "../model/appointment";
import appointmentDb from "../repository/appointment.db";

const getAllAppointments = async (): Promise<Appointment[]> => await appointmentDb.getAllAppointments();

const deleteAppointmentById = (id: number): Promise<void> => appointmentDb.deleteAppointmentById(id);

export default { 
    getAllAppointments,
    deleteAppointmentById, 
};