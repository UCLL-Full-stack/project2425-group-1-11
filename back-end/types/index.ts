import { Doctor } from "../model/doctor";
import { Patient } from "../model/patient";
import { User } from "../model/user";

export type Role = 'patient' | 'doctor' | 'admin';

export type AppointmentInput = {
    id?: number;
    startDate: Date;
    endDate: Date;
    comment: string;
    patientId: number;
    doctorId: number;
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
}

export type PatientInput = {
    id?: number;
    user: User;
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
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
};

export type AuthenticationResponse = {
    token: string;
    userName: string;
    fullName: string;
};