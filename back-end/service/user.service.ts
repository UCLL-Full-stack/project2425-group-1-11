import { User } from "../model/user";
import userDb from "../repository/user.db";
import { AuthenticationResponse, UserInput } from "../types";
import bcrypt from 'bcrypt';
import jwt from "../util/jwt";

const getUserByUsername = async ({ userName }: { userName: string }): Promise<User> => {
    const user = await userDb.getUserByUsername({ userName });
    if (!user) {
        throw new Error(`User with username: ${userName} does not exist.`);
    }
    return user;
};

const login = async({userName, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({userName: userName});
    const result =  await bcrypt.compare(password, user.getPassword());

    if (!result) {
        throw new Error('Error')
    }

    return {
        token: jwt.generateJwtToken({userName: user.getUsername(), role: user.getRole()}),
        username: userName,
        fullname: user.getFirstName() + ' ' + user.getLastName()
    }
}

export default {
    getUserByUsername,
    login,
}

