import { Record } from '../model/record';
import database from '../util/database';

const getAllRecords = async (): Promise<Record[]> => {
    try {
        const recordPrisma = await database.record.findMany({
            include: {
                patient: {
                    include: {
                        user: true,
                        records: true
                    }
                },
            },
        });
        return recordPrisma.map((record) => Record.from(record));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllRecords,
}