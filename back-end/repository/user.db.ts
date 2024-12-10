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

// const saveAppointment = async (user: User): Promise<User> => {
//     try {
//         const savedAppointment = await database.appointment.create({
//             data: {
//                 startDate: appointment.getStartDate(),
//                 endDate: appointment.getEndDate(),
//                 comment: appointment.getComment(),
//                 patient: { connect: { id: undefined }},
//                 doctor: { connect: { id: appointment.getDoctor().getId() }},
//             },
//             include: {
//                 patient: {
//                     include: {
//                         user: true,
//                         records: true
//                     }
//                 },
//                 doctor: {
//                     include: {
//                         user: true,
//                     },
//                 },
//             },
//         });
//         return Appointment.from(savedAppointment);
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// };

// const creatUser = async ({
//     userName,
//     firsName,
//     lastName,
//     email,
//     password,
//     role,
// }: {}): Promise<User> => {
//     try {
//         const userPrisma =  await database.user.create({
//             data: { userName, firstName: firsName, lastName, email, password, role }
//         })
//         return User.from(userPrisma)
//     } catch (error){
//         console.error(error);
//         throw new Error('DAtabase error. See server log for details.');
//     }
// }

export default {
    getUserByUsername,
    // creatUser,
};