import { Appointment } from "../model/appointment";
import appointmentDb from "../repository/appointment.db";
import doctorDb from "../repository/doctor.db";
import { AppointmentInput } from "../types";

const getAllAppointments = (): Promise<Appointment[]> => appointmentDb.getAllAppointments();

const deleteAppointmentById = ({ id }: { id: number }): Promise<void> => appointmentDb.deleteAppointmentById({ id });

const makeAppointment = async ({
    startDate,
    endDate,
    comment,
    doctor
}: AppointmentInput): Promise<Appointment> => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (start <= now) {
        throw new Error('Start date must be in the future');
    }

    if (end <= start) {
        throw new Error('End date must be after the start date');
    }

    const newAppointment = new Appointment({
        startDate: start,
        endDate: end,
        comment,
        doctor
    });

    appointmentDb.saveAppointment(newAppointment);

    return newAppointment;
    
};

export default { 
    getAllAppointments,
    deleteAppointmentById, 
    makeAppointment
};