import { User } from "../model/user";
import database from "../util/database";

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany({
        });
        return userPrisma.map((user) => User.from(user));
    } catch (error) {
        console.error(error);
        throw new Error('Database User error. See server log for details.');
    }
};

const getUserByUserName = async ({ userName }: { userName: string }): Promise<User | null> => {
    const userPrisma = await database.user.findFirst({
        where: { userName },
    });

    return userPrisma ? User.from(userPrisma) : null;
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    const userPrisma = await database.user.findFirst({
        where: { email },
    });

    return userPrisma ? User.from(userPrisma) : null;
};

const saveUser = async (user: User): Promise<User> => {
    try {
        const savedUser = await database.user.create({
            data: {
                userName: user.getUserName(),
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
            },
        });
        return User.from(savedUser);
    } catch (error) {
        console.error(error);
        throw new Error('Database User error. See server log for details.');
    }
};

export default {
    getAllUsers,
    getUserByUserName,
    getUserByEmail,
    saveUser,
};