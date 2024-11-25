import { Doctor } from "./doctor";
import { Pacient } from "./pacient";

export class Appointment {
    private id?: number;
    private startDate: Date;
    private endDate: Date;
    private comment: string;
    private pacient: Pacient;
    private doctor: Doctor;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(appointment: {
        id?: number;
        startDate: Date;
        endDate: Date;
        comment: string;
        pacient: Pacient;
        doctor: Doctor;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(appointment);
        this.id = appointment.id;
        this.startDate = appointment.startDate;
        this.endDate = appointment.endDate;
        this.comment = appointment.comment;
        this.pacient = appointment.pacient;
        this.doctor = appointment.doctor;
        this.createdAt = appointment.createdAt;
        this.updatedAt = appointment.updatedAt;
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

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    validate(appointment: {
        startDate: Date;
        endDate: Date;
        comment: string;
        pacient: Pacient;
        doctor: Doctor;
    }) {
        if (!appointment.startDate || !appointment.endDate) {
            throw new Error('Start and end date are required.');
        }
        if (appointment.startDate > appointment.endDate) {
            throw new Error('Start date cannot be after end date.');
        }
        if (!appointment.comment.trim()) {
            throw new Error('Comment is required.');
        }
        if (!appointment.pacient) {
            throw new Error('Pacient is required.');
        }
        if (!appointment.doctor) {
            throw new Error('Doctor is required.');
        }
    }

    equals(appointment: Appointment): boolean {
        return (
            this.startDate.getTime() === appointment.getStartDate().getTime() &&
            this.endDate.getTime() === appointment.getEndDate().getTime() &&
            this.comment === appointment.getComment() &&
            this.pacient === appointment.getPacient() &&
            this.doctor === appointment.getDoctor() &&
            this.createdAt === appointment.createdAt &&
            this.updatedAt === appointment.updatedAt
        );
    }
}
