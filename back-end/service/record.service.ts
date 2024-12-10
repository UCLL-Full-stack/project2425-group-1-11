import { Record } from "../model/record";
import recordDb from "../repository/record.db";

const getAllRecords = (): Promise<Record[]> => recordDb.getAllRecords();

export default {
    getAllRecords,
}
