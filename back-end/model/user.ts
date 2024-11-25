import { Role } from "../types";

export class User {
    private id?: number;
    private userName: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private role: Role;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(user: {
        id?: number;
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(user);
        this.id = user.id;
        this.userName = user.userName;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.userName;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }
    
    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    validate(user: {
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        if (!user.userName.trim()) {
            throw new Error('Username is required.');
        }
        if (!user.firstName.trim()) {
            throw new Error('First name is required.');
        }
        if (!user.lastName.trim()) {
            throw new Error('Last name is required.');
        }
        if (!user.email.trim()) {
            throw new Error('Email is required.');
        }
        if (!user.password.trim()) {
            throw new Error('Password is required.');
        }
        if (!user.role) {
            throw new Error('Role is required.');
        }
    }

    equals(user: User): boolean {
        return (
            this.userName === user.getUsername() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole() &&
            this.createdAt === user.createdAt &&
            this.updatedAt === user.updatedAt
        );
    }
}
