import { Patient } from "./patient";
import {
    Record as RecordPrisma,
    Patient as PatientPrisma,
} from '@prisma/client'

export class Record {
    private id?: number;
    private patient?: Patient;
    private title: string;
    private description: string;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(record: {
        id?: number;
        patient?: Patient;
        title: string;
        description: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(record);
        this.id = record.id;
        this.patient = record.patient;
        this.title = record.title;
        this.description = record.description;
        this.createdAt = record.createdAt;
        this.updatedAt = record.updatedAt;
    }

    validate(record: {
        title: string;
        description: string;
    }) {
        if (!record.title) {
            throw new Error('Title is required.');
        }
        if (!record.description) {
            throw new Error('Description is required.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getPatient(): Patient | undefined{
        return this.patient;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    equals(record: Record): boolean {
        return (
            this.title === record.getTitle() &&
            this.description === record.getDescription() &&
            this.createdAt === record.createdAt &&
            this.updatedAt === record.updatedAt
        );
    }

    static from({
        id,
        title,
        description,
        createdAt,
        updatedAt,
    }: RecordPrisma) {
        return new Record({
            id,
            title,
            description,
            createdAt,
            updatedAt,
        })
    }
}
