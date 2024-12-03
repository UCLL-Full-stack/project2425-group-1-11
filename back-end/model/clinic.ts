import { Doctor } from "./doctor";
import {
    Clinic as ClinicPrisma,
    Doctor as DoctorPrisma,
} from '@prisma/client'

export class Clinic {
    private id?: number;
    private doctors?: Doctor[];
    private address: string;
    private contactNumber: number;
    private rating: number;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(clinic: {
        id?: number;
        doctors?: Doctor[];
        address: string;
        contactNumber: number;
        rating: number;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(clinic);
        this.id = clinic.id;
        this.doctors = clinic.doctors;
        this.address = clinic.address;
        this.contactNumber = clinic.contactNumber;
        this.rating = clinic.rating;
        this.createdAt = clinic.createdAt;
        this.updatedAt = clinic.updatedAt;
    }

    validate(clinic: {
        address: string;
        contactNumber: number;
        rating: number;
    }) {
        if (!clinic.address) {
            throw new Error('No address defined.');
        }
        if (!clinic.contactNumber) {
            throw new Error('There is no contactNumber.');
        }
        if (!clinic.rating) {
            throw new Error('There is no rating.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getDoctors(): Doctor[] | undefined {
        return this.doctors;
    }

    getAddress(): string {
        return this.address;
    }

    getContactNumber(): number {
        return this.contactNumber;
    }

    getRating(): number {
        return this.rating;
    }
    
    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    equals(clinic: Clinic): boolean {
        return (
            this.address === clinic.getAddress() &&
            this.contactNumber === clinic.getContactNumber() &&
            this.rating === clinic.getRating() &&
            this.createdAt === clinic.getCreatedAt() &&
            this.updatedAt === clinic.getUpdatedAt()
        );
    }

    static from({
        id,
        address,
        contactNumber,
        rating,
        createdAt,
        updatedAt,
    }: ClinicPrisma) {
        return new Clinic({
            id,
            address,
            contactNumber,
            rating,
            createdAt,
            updatedAt,
        })
    }
}
