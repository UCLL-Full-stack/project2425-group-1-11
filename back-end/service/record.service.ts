import { Record } from "../model/record";
import recordDb from "../repository/record.db";

const getAllRecords = (): Promise<Record[]> => recordDb.getAllRecords();

const deleteRecordById = ({ id }: { id: number }): Promise<void> => recordDb.deleteRecordById({ id });

export default {
    getAllRecords,
    deleteRecordById,
}
