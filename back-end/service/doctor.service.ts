import { Doctor } from "../model/doctor";
import doctorDb from "../repository/doctor.db";


const getAllDoctors = (): Doctor[] => doctorDb.getAllDoctors();

const getDoctorById = (id: number): Doctor | undefined => {
    return doctorDb.getDoctorById(id);
};

export default { 
    getAllDoctors,
    getDoctorById
};