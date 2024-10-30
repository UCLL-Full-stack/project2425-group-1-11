import { Doctor } from "./doctor";
import { Pacient } from "./pacient";

export class Appointment {
    private id?: number;
    private startDate: Date;
    private endDate: Date;
    private comment: string;
    private pacient: Pacient;
    private doctor: Doctor;

    constructor(appointment: {
        id?: number;
        startDate: Date;
        endDate: Date;
        comment: string;
        pacient: Pacient;
        doctor: Doctor;
    }) {
        this.validate(appointment);
        this.id = appointment.id;
        this.startDate = appointment.startDate;
        this.endDate = appointment.endDate;
        this.comment = appointment.comment;
        this.pacient = appointment.pacient;
        this.doctor = appointment.doctor;
    }

    getId(): number | undefined {
        return this.id;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }

    getComment(): string {
        return this.comment;
    }

    getPacient(): Pacient {
        return this.pacient;
    }

    getDoctor(): Doctor {
        return this.doctor;
    }

    validate(appointment: {
        startDate: Date;
        endDate: Date;
        comment: string;
        pacient: Pacient;
        doctor: Doctor;
    }) {
        if (!appointment.startDate || !appointment.endDate) {
            throw new Error('Start and end date are required');
        }
        if (appointment.startDate > appointment.endDate) {
            throw new Error('Start date cannot be after end date');
        }
        if (!appointment.comment?.trim()) {
            throw new Error('comment is required');
        }
        if (!appointment.pacient) {
            throw new Error('pacient is required');
        }
        if (!appointment.doctor) {
            throw new Error('doctor is required');
        }
    }

    equals(appointment: Appointment): boolean {
        return (
            this.startDate === appointment.getStartDate() &&
            this.endDate === appointment.getEndDate() &&
            this.comment === appointment.getComment() &&
            this.pacient === appointment.getPacient() &&
            this.doctor === appointment.getDoctor()
        );
    }
}
