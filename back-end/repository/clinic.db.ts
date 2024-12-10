import { Clinic } from "../model/clinic";
import database from "../util/database";

const getAllClinics = async (): Promise<Clinic[]> => {
    try {
        const clinicPrisma = await database.clinic.findMany({
            include: {
                doctors: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return clinicPrisma.map((clinic) => Clinic.from(clinic));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllClinics,
}