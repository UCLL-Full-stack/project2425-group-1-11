import { Doctor } from "../model/doctor";
import doctorDb from "../repository/doctor.db";

const getAllDoctors = (): Promise<Doctor[]> => doctorDb.getAllDoctors();

export default { 
    getAllDoctors,
};