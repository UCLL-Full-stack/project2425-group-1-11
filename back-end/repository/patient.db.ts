import { Patient } from "../model/patient";
import { Record } from "../model/record";
import database from "../util/database";

const getAllPatients = async (): Promise<Patient[]> => {
    try {
        const patientPrisma = await database.patient.findMany({
            include: {
                user: true,
                records: true,
            },
        });
        return patientPrisma.map((patient) => Patient.from(patient));
    } catch (error) {
        console.error(error);
        throw new Error('Database Patient error. See server log for details.');
    }
};

const getPatientById = async ({ id }: { id: number }): Promise<Patient | null> => {
    try {
        const patientPrisma = await database.patient.findUnique({
            where: { id },
            include: {
                user: true,
                records: true,
            },
        });

        return patientPrisma ? Patient.from(patientPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database Patient error. See server log for details.');
    }
};



export default {
    getAllPatients,
    getPatientById,
}