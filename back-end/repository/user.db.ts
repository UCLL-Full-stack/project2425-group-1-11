import { User } from "../model/user";
import database from "../util/database";

const getUserByUsername = async ({ userName }: { userName: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { userName },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const saveUser = async (user: User): Promise<User> => {
    try {
        const savedUser = await database.user.create({
            data: {
                userName: user.getUsername(),
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
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getUserByUsername,
    saveUser,
};