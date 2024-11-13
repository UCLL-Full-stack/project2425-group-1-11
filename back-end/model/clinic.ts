import { Doctor } from "./doctor";

export class Clinic {
    private id?: number;
    private doctors: Doctor[];
    private address: string;
    private contactNumber: number;
    private rating: number;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(clinic: {
        id?: number;
        doctors: Doctor[];
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

    getId(): number | undefined {
        return this.id;
    }

    getDoctors(): Doctor[] {
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

    validate(clinic: {
        doctors: Doctor[]
        address: string;
        contactNumber: number;
        rating: number;
    }) {
        if (!clinic.doctors) {
            throw new Error('No doctors found.');
        }
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

    equals(clinic: Clinic): boolean {
        return (
            this.doctors === clinic.getDoctors() &&
            this.address === clinic.getAddress() &&
            this.contactNumber === clinic.getContactNumber() &&
            this.rating === clinic.getRating() &&
            this.createdAt === clinic.createdAt &&
            this.updatedAt === clinic.updatedAt
        );
    }
}