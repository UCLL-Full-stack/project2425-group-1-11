import { Clinic } from "../model/clinic";
import clinicDb from "../repository/clinic.db";

const getAllClinics = (): Promise<Clinic[]> => clinicDb.getAllClinics();

export default {
    getAllClinics,
}