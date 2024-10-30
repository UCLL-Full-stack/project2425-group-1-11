import { Pacient } from "./pacient";


export class Record {
    private id?: number;
    private pacient: Pacient;
    private title: string;
    private description: string;

    constructor(record: {
        id?: number;
        pacient: Pacient;
        title: string;
        description: string;
    }) {
        this.validate(record);
        this.id = record.id;
        this.pacient = record.pacient;
        this.title = record.title;
        this.description = record.description;
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
            this.description === record.getDescription()
        );
    }
}
