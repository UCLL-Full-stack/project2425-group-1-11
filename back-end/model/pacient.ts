import { Appointment } from "./appointment";
import { Record } from "./record";
import { User } from "./user";

export class Pacient {
    private id?: number;
    private user: User;
    private records: Record[];
    private appointments: Appointment[];

    constructor(pacient: {
        id?: number;
        user: User;
        records: Record[];
        appointments: Appointment[];
    }) {
        this.validate(pacient);
        this.id = pacient.id;
        this.user = pacient.user;
        this.records = pacient.records;
        this.appointments = pacient.appointments;
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

    validate(user: {
        user: User;
        records: Record[];
        appointments: Appointment[];
    }) {
        if (!user.user) {
            throw new Error('No User defined.');
        }
        if (!user.records) {
            throw new Error('There are no records for this user.');
        }
        if (!user.appointments) {
            throw new Error('There are no appointments for this user.');
        }
    }

    equals(pacient: Pacient): boolean {
        return (
            this.user === pacient.getUser() &&
            this.records === pacient.getRecords() &&
            this.appointments === pacient.getAppointments()
        );
    }
}
