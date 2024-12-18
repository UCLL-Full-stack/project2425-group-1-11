import { Patient } from "../model/patient";
import patientDb from "../repository/patient.db";

const getAllPatients = (): Promise<Patient[]> => patientDb.getAllPatients();

const getPatientByUserId = ({ userId }: { userId: number }): Promise<Patient | null> => patientDb.getPatientByUserId({userId});

export default {
    getAllPatients,
    getPatientByUserId,
}