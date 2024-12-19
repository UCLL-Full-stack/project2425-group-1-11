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
        throw new Error('Database Record error. See server log for details.');
    }
};

const addRecordToPatient = async ({ patientId, record }: { patientId: number, record: Record}): Promise<Record> => {
    try {
        const newRecord = await database.record.create({
            data: {
                title: record.getTitle(),
                description: record.getDescription(),
            },
        });

        await database.patient.update({
            where: { id: patientId },
            data: {
                records: {
                    connect: { id: newRecord.id },
                },
            },
        });

        return Record.from(newRecord);
    } catch (error) {
        console.error('Error adding record to patient:', error);
        throw new Error('Database Record error. See server log for details.');
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

const updateRecord = async ({ recordId, record }: { recordId: number, record: Record}): Promise<Record> => {
    try {
        const updatedRecord = await database.record.update({
            where: { id: recordId },
            data: {
                title: record.getTitle(),
                description: record.getDescription(),
            },
        });

        return Record.from(updatedRecord);
    } catch (error) {
        console.error('Error updating record:', error);
        throw new Error('Database Record error. See server log for details.');
    }
};

const getRecordsByPatientId = async (id?: number): Promise<Record[]> => {
    try {
        const patientPrisma = await database.patient.findUnique({
            where: { id },
            include: { records: true }
        });
        return patientPrisma?.records.map(record => Record.from(record)) || [];
    } catch (error) {
        console.error('Error fetching records for patient:', error);
        throw new Error('Database Record error. See server log for details.');
    }
};


export default {
    getAllRecords,
    deleteRecordById,
    saveRecord,
    addRecordToPatient,
    updateRecord,
    getRecordsByPatientId,
}