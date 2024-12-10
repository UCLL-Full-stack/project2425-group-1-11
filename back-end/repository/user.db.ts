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

const creatUser = async ({
    userName,
    firsName,
    lastName,
    email,
    password,
    role,
}: {
    userName: string;
    firsName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}): Promise<User> => {
    try {
        const userPrisma =  await database.user.create({
            data: { userName, firstName: firsName, lastName, email, password, role }
        })
        return User.from(userPrisma)
    } catch (error){
        console.error(error);
        throw new Error('DAtabase error. See server log for details.');
    }
}

export default {
    getUserByUsername,
    creatUser,
};