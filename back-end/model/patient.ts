import { Appointment } from "./appointment";
import { Record } from "./record";
import { User } from "./user";
import {
    Patient as PatientPrisma,
    User as UserPrisma,
    Appointment as AppointmentPrisma,
} from '@prisma/client'

export class Patient {
    private id?: number;
    private user: User;
    private records?: Record[];
    private appointments: Appointment[];
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(patient: {
        id?: number;
        user: User;
        records?: Record[];
        appointments: Appointment[];
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(patient);
        this.id = patient.id;
        this.user = patient.user;
        this.records = patient.records;
        this.appointments = patient.appointments;
        this.createdAt = patient.createdAt;
        this.updatedAt = patient.updatedAt;
    }

    validate(patient: {
        user: User;
        appointments: Appointment[];
    }) {
        if (!patient.user) {
            throw new Error('No User defined.');
        }
        if (!patient.appointments) {
            throw new Error('There are no appointments for this user.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getRecords(): Record[] | undefined {
        return this.records;
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

    equals(patient: Patient): boolean {
        return (
            this.user === patient.getUser() &&
            this.appointments === patient.getAppointments() && 
            this.createdAt === patient.getCreatedAt() &&
            this.updatedAt === patient.getUpdatedAt()
        );
    }

    static from({
        id,
        user,
        appointments,
        createdAt,
        updatedAt,
    }: PatientPrisma & { user: UserPrisma; appointments: AppointmentPrisma[] }) {
        return new Patient({
            id,
            user: User.from(user),
            appointments: appointments.map((appointment) => Appointment.from(appointment)),
            createdAt,
            updatedAt,
        })
    }
}
