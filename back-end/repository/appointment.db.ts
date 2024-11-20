import { Appointment } from '../model/appointment';
import { Doctor } from '../model/doctor';
import { User } from '../model/user';
import { Patient } from '../model/patient';
import database from './database';

const getAllAppointments = async (): Promise<Appointment[]> => {
    try {
        const appointmentPrisma = await database.appointment.findMany({
            include: {patient: true, doctor: true},
        })
        return appointmentPrisma.map((appointmentPrisma) => Appointment.from(appointmentPrisma))
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.')
    }
};

const deleteAppointmentById = async (id: number): Promise<void> => {
    try {
        await database.appointment.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllAppointments,
    deleteAppointmentById,
};