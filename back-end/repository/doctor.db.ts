import { Doctor } from '../model/doctor';
import database from '../util/database';

const getAllDoctors = async (): Promise<Doctor[]> => {
    try {
        const doctorPrisma = await database.doctor.findMany({
            include: {
                user: true,
                appointments: true,
            },
        });
        return doctorPrisma.map((doctor) => Doctor.from(doctor));
    } catch (error) {
        console.error(error);
        throw new Error('Database Doctor error. See server log for details.');
    }
};

const getDoctorById = async ({ id }: { id: number }): Promise<Doctor | null> => {
    try {
        const doctorPrisma = await database.doctor.findUnique({
            where: { id },
            include: {
                user:true,
            },
        });
        return doctorPrisma ? Doctor.from(doctorPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database Doctor error. See server log for details.');
    }
};

const getDoctorByUserId = async ({ userId }: { userId: number }): Promise<Doctor | null> => {
    try {
        const doctorPrisma = await database.doctor.findUnique({
            where: { userId },
            include: {
                user: true,
            },
        });

        return doctorPrisma ? Doctor.from(doctorPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database Patient error. See server log for details.');
    }
};

export default {
    getAllDoctors,
    getDoctorById,
    getDoctorByUserId,
};