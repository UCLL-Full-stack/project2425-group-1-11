import { Appointment } from "../model/appointment";
import appointmentDb from "../repository/appointment.db";
import { AppointmentInput } from "../types";

const getAllAppointments = (): Promise<Appointment[]> => appointmentDb.getAllAppointments();

const deleteAppointmentById = ({ id }: { id: number }): Promise<void> => appointmentDb.deleteAppointmentById({ id });

const makeAppointment = async (appointment: AppointmentInput): Promise<Appointment> => {

    const start = new Date(appointment.startDate);
    const end = new Date(appointment.endDate);
    const now = new Date();

    if (start <= now) {
        throw new Error('Start date must be in the future');
    }

    if (end <= start) {
        throw new Error('End date must be after the start date');
    }

    if (!appointment.patient) {
        throw new Error('Patient is required');
    }

    if (!appointment.doctor) {
        throw new Error('Doctor is required');
    }

    const newAppointment = new Appointment({
        startDate: start,
        endDate: end,
        comment: appointment.comment,
        patient: appointment.patient,
        doctor: appointment.doctor,
    });

    await appointmentDb.saveAppointment(newAppointment);

    return newAppointment;
};

export default { 
    getAllAppointments,
    deleteAppointmentById, 
    makeAppointment,
};