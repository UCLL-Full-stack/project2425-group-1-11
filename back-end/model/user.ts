import { Role } from "../types";
import {
    User as UserPrisma,
} from '@prisma/client'

export class User {
    private id?: number;
    private userName: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private role: Role;

    constructor(user: {
        id?: number;
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);
        this.id = user.id;
        this.userName = user.userName;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    validate(user: {
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        if (!user.userName) {
            throw new Error('Username is required.');
        }
        if (!user.firstName) {
            throw new Error('First name is required.');
        }
        if (!user.lastName) {
            throw new Error('Last name is required.');
        }
        if (!user.email) {
            throw new Error('Email is required.');
        }
        if (!user.password) {
            throw new Error('Password is required.');
        }
        if (!user.role) {
            throw new Error('Role is required.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getUserName(): string {
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

    equals(user: User): boolean {
        return (
            this.userName === user.getUserName() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }

    static from({
        id, 
        userName, 
        firstName, 
        lastName, 
        email, 
        password,
        role
    }: UserPrisma) {
            return new User({
                id,
                userName,
                firstName,
                lastName,
                email,
                password,
                role: role as Role,
            })
        }
    
}
