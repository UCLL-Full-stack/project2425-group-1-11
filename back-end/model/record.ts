import { Pacient } from "./pacient";
import {
    Record as RecordPrisma,
    Pacient as PacientPrisma,
} from '@prisma/client'


export class Record {
    private id?: number;
    private pacient: Pacient;
    private title: string;
    private description: string;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(record: {
        id?: number;
        pacient: Pacient;
        title: string;
        description: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(record);
        this.id = record.id;
        this.pacient = record.pacient;
        this.title = record.title;
        this.description = record.description;
        this.createdAt = record.createdAt;
        this.updatedAt = record.updatedAt;
    }

    getId(): number | undefined {
        return this.id;
    }

    getPacient(): Pacient {
        return this.pacient;
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
        pacient: Pacient;
        title: string;
        description: string;
    }) {
        if (!record.pacient) {
            throw new Error('Pacient is required.');
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
            this.pacient === record.getPacient() &&
            this.title === record.getTitle() &&
            this.description === record.getDescription() && 
            this.createdAt === record.getCreatedAt() &&
            this.updatedAt === record.getUpdatedAt()
        );
    }

    static from({id, pacient, title, description, createdAt, updatedAt}: 
        RecordPrisma & {pacient: PacientPrisma }) {
            return new Record({
                id,
                pacient: Pacient.from(pacient),
                title,
                description,
                createdAt,
                updatedAt,
            });
        }
}
