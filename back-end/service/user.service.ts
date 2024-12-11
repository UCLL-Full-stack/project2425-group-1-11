import { User } from "../model/user";
import userDb from "../repository/user.db";
import { AuthenticationResponse, UserInput } from "../types";
import bcrypt from 'bcrypt';
import jwt from '../util/jwt';

const getUserByUsername = async ({ userName }: { userName: string }): Promise<User> => {
    const user = await userDb.getUserByUsername({ userName });
    if (!user) {
        throw new Error(`User with username: ${userName} does not exist.`);
    }
    return user;
};

const makeUser = async (user: UserInput): Promise<User> => {

    const userInput = await userDb.getUserByUsername({userName: user.userName})

    if (userInput) {
        throw new Error(`User with username: ${user.userName} does not exist`)
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
    const user = await getUserByUsername({ userName });
    const isPasswordValid = await bcrypt.compare(password, user.getPassword());
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }

    const token = jwt.generateJwtToken({ userName: user.getUsername(), role: user.getRole() });
    return { 
        token, 
        userName: userName, 
        fullName: `${user.getFirstName()} ${user.getLastName()}` 
    };
};

export default {
    makeUser,
    getUserByUsername,
    login,
}

