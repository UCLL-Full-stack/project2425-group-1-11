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

export default {
    getUserByUsername,
};