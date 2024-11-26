import { Appointment } from "../model/appointment";
import { Doctor } from "../model/doctor";
import { Patient } from "../model/patient";
import { Record } from "../model/record";
import { User } from "../model/user";

export type Role = 'patient' | 'doctor';

export type AppointmentInput = {
    id?: number;
    startDate: Date;
    endDate: Date;
    comment: string;
    patient: Patient;
    doctor: Doctor;
}

export type ClinicInput = {
    id?: number;
    doctors: Doctor[];
    address: string;
    contactNumber: number;
    rating: number;
}

export type DoctorInput = {
    id?: number;
    user: User;
    department: string;
    appointments: Appointment[];
}

export type PatientInput = {
    id?: number;
    user: User;
    records: Record[];
    appointments: Appointment[];
}

export type RecordInput = {
    id?: number;
    patient: Patient;
    title: string;
    description: string;
}

export type UserInput = {
    id?: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
};