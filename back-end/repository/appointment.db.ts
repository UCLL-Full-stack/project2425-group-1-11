import { Appointment } from '../model/appointment';
import database from '../util/database';

const getAllAppointments = async (): Promise<Appointment[]> => {
    try {
        const appointmentPrisma = await database.appointment.findMany({
            include: {
                patient: {
                    include: {
                        user: true,
                        records: true
                    }
                },
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
        throw new Error('Database Appointment error. See server log for details.');
    }
};

const deleteAppointmentById = async ({ id }: { id: number }): Promise<void> => {
    try {
        await database.appointment.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database Appointment error. See server log for details.');
    }
};

const saveAppointment = async (appointment: Appointment): Promise<Appointment> => {
    try {
        const savedAppointment = await database.appointment.create({
            data: {
                startDate: appointment.getStartDate(),
                endDate: appointment.getEndDate(),
                comment: appointment.getComment(),
                patient: { connect: { id: appointment.getPatient().getId() }},
                doctor: { connect: { id: appointment.getDoctor().getId() }},
            },
            include: {
                patient: {
                    include: {
                        user: true,
                        records: true
                    }
                },
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
        throw new Error('Database Appointment error. See server log for details.');
    }
};

export default {
    getAllAppointments,
    deleteAppointmentById,
    saveAppointment,
};