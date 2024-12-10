import { Patient } from "../model/patient";
import patientDb from "../repository/patient.db";

const getAllPatients = (): Promise<Patient[]> => patientDb.getAllPatients();

export default {
    getAllPatients,
}