import { Patient } from "../model/patient";
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
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllPatients,
}