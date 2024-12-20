import { Doctor } from "../model/doctor";
import doctorDb from "../repository/doctor.db";

const getAllDoctors = (): Promise<Doctor[]> => doctorDb.getAllDoctors();

const getDoctorByUserId = ({ userId }: { userId: number }): Promise<Doctor | null> => doctorDb.getDoctorByUserId({userId});

const getDoctorById = async ({ id }: { id: number }): Promise<Doctor> => {
    const doctor = await doctorDb.getDoctorById({ id });
    if (!doctor) {
        throw new Error(`Doctor with id ${id} not found`);
    }
    return doctor;
};

export default { 
    getAllDoctors,
    getDoctorById,
    getDoctorByUserId,
};