import { User } from "../model/user";
import userDb from "../repository/user.db";
import { AuthenticationResponse, UserInput } from "../types";
import bcrypt from 'bcrypt';
import jwt from '../util/jwt';

const getAllUsers = (): Promise<User[]> => userDb.getAllUsers();

const makeUser = async (user: UserInput): Promise<User> => {

    const existingUserName = await userDb.getUserByUserName({ userName: user.userName });
    if (existingUserName) {
        throw new Error(`User with username ${user.userName} already exists.`);
    }

    const existingUserEmail = await userDb.getUserByEmail({ email: user.email });
    if (existingUserEmail) {
        throw new Error(`User with email ${user.email} already exists.`);
    }

    if (user.role === 'patient' || user.role === 'doctor' || user.role === 'admin') {
        user.role
    } else {
        throw new Error('Role must be patient, doctor or admin')
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);

    const newUser = new User({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        role: user.role,
    });

    await userDb.saveUser(newUser);

    return newUser;
};

const login = async (userName: string, password: string): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByUserName({ userName });
    if (!user) {
        throw new Error(`User with username: ${userName} does not exist.`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.getPassword());
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.generateJwtToken({ userName: user.getUserName(), role: user.getRole() });
    return { 
        token, 
        id: user.getId() ?? 0,
        userName: userName, 
        firstName: user.getFirstName(), 
        lastName: user.getLastName(),
        email: user.getEmail(),
        role: user.getRole()
    };
};

export default {
    getAllUsers,
    makeUser,
    login,
};
