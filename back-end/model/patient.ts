import { Record } from "./record";
import { User } from "./user";
import {
    Patient as PatientPrisma,
    User as UserPrisma,
    Record as RecordPrisma,
} from '@prisma/client'

export class Patient {
    private id?: number;
    private user: User;
    private records: Record[];
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(patient: {
        id?: number;
        user: User;
        records: Record[];
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(patient);
        this.id = patient.id;
        this.user = patient.user;
        this.records = patient.records;
        this.createdAt = patient.createdAt;
        this.updatedAt = patient.updatedAt;
    }

    validate(patient: {
        user: User;
        records: Record[];
    }) {
        if (!patient.user) {
            throw new Error('No User defined.');
        }
        if (!patient.records) {
            throw new Error('There are no records for this user.');
        }
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

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    equals(patient: Patient): boolean {
        return (
            this.user === patient.getUser() &&
            this.records === patient.getRecords() &&
            this.createdAt === patient.getCreatedAt() &&
            this.updatedAt === patient.getUpdatedAt()
        );
    }

    static from({
        id,
        user,
        records,
        createdAt,
        updatedAt,
    }: PatientPrisma & { user: UserPrisma; records: RecordPrisma[];}) {
        return new Patient({
            id,
            user: User.from(user),
            records: records.map((record) => Record.from(record)),
            createdAt,
            updatedAt,
        })
    }
}
