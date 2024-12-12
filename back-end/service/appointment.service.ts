import { Appointment } from "../model/appointment";
import appointmentDb from "../repository/appointment.db";
import doctorDb from "../repository/doctor.db";
import patientDb from "../repository/patient.db";
import { AppointmentInput } from "../types";

const getAllAppointments = (): Promise<Appointment[]> => appointmentDb.getAllAppointments();

const deleteAppointmentById = ({ id }: { id: number }): Promise<void> => appointmentDb.deleteAppointmentById({ id });

const makeAppointment = async (appointment: AppointmentInput): Promise<Appointment> => {
    const start = new Date(appointment.startDate);
    const end = new Date(appointment.endDate);
    const now = new Date();

    if (start <= now) {
        throw new Error('Start date must be in the future');
    }

    if (end <= start) {
        throw new Error('End date must be after the start date');
    }

    if (!appointment.patientId) {
        throw new Error('Patient ID is required');
    }
    const patientId = appointment.patientId;
    if (patientId === undefined) {
        throw new Error('Patient ID is required');
    }
    const patient = await patientDb.getPatientById({ id: patientId });
    if (!patient) {
        throw new Error('Patient not found');
    }

    if (!appointment.doctorFirstName) {
        throw new Error('Doctor firstname is required');
    }
    if (!appointment.doctorLastName) {
        throw new Error('Doctor lastname is required');
    }
    const doctorFirstName = appointment.doctorFirstName;
    const doctorLastName = appointment.doctorLastName;

    if (doctorFirstName === undefined) {
        throw new Error('Doctor firstname is required');
    }
    if (doctorLastName === undefined) {
        throw new Error('Doctor lastname is required');
    }
    const doctor = await doctorDb.getDoctorByFullName({ firstName: doctorFirstName, lastName: doctorLastName });
    if (!doctor) {
        throw new Error('Doctor not found');
    }

    const newAppointment = new Appointment({
        startDate: start,
        endDate: end,
        comment: appointment.comment,
        patient: patient,
        doctor: doctor,
    });

    await appointmentDb.saveAppointment(newAppointment);

    return newAppointment;
};

export default { 
    getAllAppointments,
    deleteAppointmentById, 
    makeAppointment,
};