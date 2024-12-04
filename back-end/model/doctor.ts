import { Appointment } from "./appointment";
import { Clinic } from "./clinic";
import { User } from "./user";
import {
    Doctor as DoctorPrisma,
    User as UserPrisma,
    Clinic as ClinicPrisma,
    Appointment as AppointmentPrisma,
} from '@prisma/client'

export class Doctor {
    private id?: number;
    private user: User;
    private clinic: Clinic;
    private department: string;
    private appointments: Appointment[];
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(doctor: {
        id?: number;
        user: User;
        clinic: Clinic;
        department: string;
        appointments: Appointment[];
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(doctor);
        this.id = doctor.id;
        this.user = doctor.user;
        this.clinic = doctor.clinic;
        this.department = doctor.department;
        this.appointments = doctor.appointments;
        this.createdAt = doctor.createdAt;
        this.updatedAt = doctor.updatedAt;
    }

    validate(doctor: {
        user: User;
        clinic: Clinic
        department: string;
        appointments: Appointment[];
    }) {
        if (!doctor.user) {
            throw new Error('No User defined.');
        }
        if (!doctor.clinic) {
            throw new Error('No Clinic defined.');
        }
        if (!doctor.department) {
            throw new Error('Department is required.');
        }
        if (!doctor.appointments) {
            throw new Error('There are no appointments for this user.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getClinic(): Clinic{
        return this.clinic;
    }

    getDepartment(): string {
        return this.department;
    }

    getAppointments(): Appointment[] {
        return this.appointments;
    }

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    equals(doctor: Doctor): boolean {
        return (
            this.user === doctor.getUser() &&
            this.clinic === doctor.getClinic() &&
            this.department === doctor.getDepartment() &&
            this.appointments === doctor.getAppointments() &&
            this.createdAt === doctor.getCreatedAt() &&
            this.updatedAt === doctor.getUpdatedAt()
        );
    }

    static from({
        id,
        user,
        clinic,
        department,
        appointments,
        createdAt,
        updatedAt,
    }: DoctorPrisma & { user: UserPrisma; clinic: ClinicPrisma; appointments: AppointmentPrisma[] }) {
        return new Doctor({
            id,
            user: User.from(user),
            clinic: Clinic.from(clinic),
            department,
            appointments: appointments.map((appointment) => Appointment.from(appointment)),
            createdAt,
            updatedAt,
        })
    }

}
