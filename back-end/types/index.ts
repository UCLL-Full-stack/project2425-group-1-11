import { Appointment } from "../model/appointment";
import { Doctor } from "../model/doctor";
import { Pacient } from "../model/pacient";
import { Record } from "../model/record";
import { User } from "../model/user";

export type Role = 'pacient' | 'doctor';

export type AppointmentInput = {
    id?: number;
    startDate: Date;
    endDate: Date;
    comment: string;
    pacient: Pacient;
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

export type PacientInput = {
    id?: number;
    user: User;
    records: Record[];
    appointments: Appointment[];
}

export type RecordInput = {
    id?: number;
    pacient: Pacient;
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