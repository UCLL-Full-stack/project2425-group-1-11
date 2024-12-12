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
        throw new Error('Database Record error. See server log for details.');
    }
};

const saveRecord = async (record: Record): Promise<Record> => {
    try {
        const savedRecord = await database.record.create({
            data: {
                title: record.getTitle(),
                description: record.getDescription(),
            },
        });
        return Record.from(savedRecord);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteRecordById = async ({ id }: { id: number }): Promise<void> => {
    try {
        await database.record.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database Record error. See server log for details.');
    }
};

export default {
    getAllRecords,
    deleteRecordById,
}