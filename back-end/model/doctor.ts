import { User } from "./user";
import {
    Doctor as DoctorPrisma,
    User as UserPrisma,
} from '@prisma/client'

export class Doctor {
    private id?: number;
    private user: User;
    private department: string;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(doctor: {
        id?: number;
        user: User;
        department: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(doctor);
        this.id = doctor.id;
        this.user = doctor.user;
        this.department = doctor.department;
        this.createdAt = doctor.createdAt;
        this.updatedAt = doctor.updatedAt;
    }

    validate(doctor: {
        user: User;
        department: string;
    }) {
        if (!doctor.user) {
            throw new Error('No User defined.');
        }
        if (!doctor.department) {
            throw new Error('Department is required.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getDepartment(): string {
        return this.department;
    }

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    equals(doctor: Doctor): boolean {
        return (
            this.user === doctor.getUser() &&
            this.department === doctor.getDepartment() &&
            this.createdAt === doctor.getCreatedAt() &&
            this.updatedAt === doctor.getUpdatedAt()
        );
    }

    static from({
        id,
        user,
        department,
        createdAt,
        updatedAt,
    }: DoctorPrisma & { user: UserPrisma }) {
        return new Doctor({
            id,
            user: User.from(user),
            department,
            createdAt,
            updatedAt,
        })
    }

}
