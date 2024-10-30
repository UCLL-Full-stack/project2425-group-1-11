import { Appointment } from "../model/appointment";
import appointmentDb from "../repository/appointment.db";

const getAllAppointments = (): Appointment[] => appointmentDb.getAllAppointments();

export default { 
    getAllAppointments, 
};