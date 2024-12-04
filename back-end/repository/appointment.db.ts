import { Appointment } from '../model/appointment';
import { Doctor } from '../model/doctor';
import { Patient } from '../model/patient';
import { User } from '../model/user';
import database from '../util/database';

const getAllAppointments = async (): Promise<Appointment[]> => {
    try {
        const appointmentPrisma = await database.appointment.findMany({
            include: {
                patient: true,
                doctor: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return appointmentPrisma.map((appointment) => Appointment.from(appointment));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteAppointmentById = async ({ id }: { id: number }): Promise<void> => {
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