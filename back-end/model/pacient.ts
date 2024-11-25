import { Appointment } from "./appointment";
import { Record } from "./record";
import { User } from "./user";

export class Pacient {
    private id?: number;
    private user: User;
    private records: Record[];
    private appointments: Appointment[];
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(pacient: {
        id?: number;
        user: User;
        records: Record[];
        appointments: Appointment[];
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(pacient);
        this.id = pacient.id;
        this.user = pacient.user;
        this.records = pacient.records;
        this.appointments = pacient.appointments;
        this.createdAt = pacient.createdAt;
        this.updatedAt = pacient.updatedAt;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getRecords(): Record[] {
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

    validate(pacient: {
        user: User;
        records: Record[];
        appointments: Appointment[];
    }) {
        if (!pacient.user) {
            throw new Error('No User defined.');
        }
        if (!pacient.records) {
            throw new Error('There are no records for this user.');
        }
        if (!pacient.appointments) {
            throw new Error('There are no appointments for this user.');
        }
    }

    equals(pacient: Pacient): boolean {
        return (
            this.user === pacient.getUser() &&
            this.records === pacient.getRecords() &&
            this.appointments === pacient.getAppointments() && 
            this.createdAt === pacient.createdAt &&
            this.updatedAt === pacient.updatedAt
        );
    }
}
