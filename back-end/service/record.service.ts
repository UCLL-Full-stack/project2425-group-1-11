import { Record } from "../model/record";
import recordDb from "../repository/record.db";
import { RecordInput } from "../types";
import database from "../util/database";

const getAllRecords = (): Promise<Record[]> => recordDb.getAllRecords();

const deleteRecordById = ({ id }: { id: number }): Promise<void> => recordDb.deleteRecordById({ id });

const makeRecord = async ({ id, record }: { id: number, record: RecordInput }): Promise<Record> => {

    const newRecord = new Record({
        id: record.id,
        title: record.title,
        description: record.description
    });

    await recordDb.addRecordToPatient({patientId: id, record: newRecord});

    return newRecord;
};

const updateRecord = async ({ recordId, record }: { recordId: number, record: RecordInput }): Promise<Record> => {

    const newRecord = new Record({
        title: record.title,
        description: record.description
    });

    await recordDb.updateRecord({recordId: recordId, record: newRecord});

    return newRecord;
};

export default {
    getAllRecords,
    deleteRecordById,
    makeRecord,
    updateRecord,
}
