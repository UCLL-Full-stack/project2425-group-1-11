import { Doctor } from "./doctor";
import { Patient } from "./patient";
import {
    Appointment as AppointmentPrisma,
} from '@prisma/client';

export class Appointment {
    private id?: number;
    private startDate: Date;
    private endDate: Date;
    private comment: string;
    private patient?: Patient;
    private doctor?: Doctor;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(appointment: {
        id?: number;
        startDate: Date;
        endDate: Date;
        comment: string;
        patient?: Patient;
        doctor?: Doctor;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(appointment);
        this.id = appointment.id;
        this.startDate = appointment.startDate;
        this.endDate = appointment.endDate;
        this.comment = appointment.comment;
        this.patient = appointment.patient;
        this.doctor = appointment.doctor;
        this.createdAt = appointment.createdAt;
        this.updatedAt = appointment.updatedAt;
    }

    validate(appointment: {
        startDate: Date;
        endDate: Date;
        comment: string;
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

    getPatient(): Patient | undefined {
        return this.patient;
    }

    getDoctor(): Doctor | undefined {
        return this.doctor;
    }

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    equals(appointment: Appointment): boolean {
        return (
            this.startDate.getTime() === appointment.getStartDate().getTime() &&
            this.endDate.getTime() === appointment.getEndDate().getTime() &&
            this.comment === appointment.getComment() &&
            this.createdAt === appointment.getCreatedAt() &&
            this.updatedAt === appointment.getUpdatedAt()
        );
    }

    static from({
        id,
        startDate,
        endDate,
        comment,
        createdAt,
        updatedAt,
    }: AppointmentPrisma) {
        return new Appointment ({
            id,
            startDate,
            endDate,
            comment,
            createdAt,
            updatedAt,
        })
    }
}
