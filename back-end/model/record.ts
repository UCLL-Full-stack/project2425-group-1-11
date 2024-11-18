import { Patient } from "./patient";
import {
    Record as RecordPrisma,
    Patient as PatientPrisma,
} from '@prisma/client'


export class Record {
    private id?: number;
    private patient: Patient;
    private title: string;
    private description: string;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(record: {
        id?: number;
        patient: Patient;
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

    getId(): number | undefined {
        return this.id;
    }

    getPatient(): Patient {
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

    validate(record: {
        patient: Patient;
        title: string;
        description: string;
    }) {
        if (!record.patient) {
            throw new Error('Patient is required.');
        }
        if (!record.title) {
            throw new Error('Title is required.');
        }
        if (!record.description) {
            throw new Error('Description is required.');
        }
    }

    equals(record: Record): boolean {
        return (
            this.patient === record.getPatient() &&
            this.title === record.getTitle() &&
            this.description === record.getDescription() && 
            this.createdAt === record.getCreatedAt() &&
            this.updatedAt === record.getUpdatedAt()
        );
    }

    static from({id, patient, title, description, createdAt, updatedAt}: 
        RecordPrisma & {patient: PatientPrisma }) {
            return new Record({
                id,
                patient: Patient.from(patient),
                title,
                description,
                createdAt,
                updatedAt,
            });
        }
}
