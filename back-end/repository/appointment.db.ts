import { Appointment } from '../model/appointment';
import database from '../util/database';
import { User } from '../model/user';

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

// const saveAppointment = (appointment: Appointment): void => {
//     appointments.push(appointment);
// };

// const getUserByName = async ({ firstName, lastName }: { firstName: string, lastName: string }): Promise<User | null> => {
//     try {
//         const userPrisma = await database.user.findFirst({
//             where: { firstName, lastName },
//         });
//         return userPrisma ? User.from(userPrisma) : null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// };

const saveAppointment = async (appointment: Appointment): Promise<Appointment> => {
    try {
        const savedAppointment = await database.appointment.create({
            data: {
                startDate: appointment.getStartDate(),
                endDate: appointment.getEndDate(),
                comment: appointment.getComment(),
                doctor: {
                    connect: { id: appointment.getDoctor()?.getId() },
                },
            },
            include: {
                doctor: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return Appointment.from(savedAppointment);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllAppointments,
    deleteAppointmentById,
    saveAppointment
};