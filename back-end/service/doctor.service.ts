import { Doctor } from "../model/doctor";
import doctorDb from "../repository/doctor.db";


const getAllDoctors = (): Promise<Doctor[]> => doctorDb.getAllDoctors();

const getDoctorById = (id: number): Promise<Doctor | null> => {
    return doctorDb.getDoctorById({ id });
};

export default { 
    getAllDoctors,
    getDoctorById
};