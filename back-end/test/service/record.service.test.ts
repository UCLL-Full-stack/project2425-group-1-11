import { Record } from '../../model/record';
import recordDb from '../../repository/record.db';
import recordService from '../../service/record.service';
import { UnauthorizedError } from 'express-jwt';

const record = new Record({id: 1, title: 'Title1', description: 'Description1',})

const records = [
    new Record({id: 1, title: 'Title1', description: 'Description1',})
];

let mockRecordGetAllRecords: jest.Mock;
let mockRecordGetRecordsByPatientUserName: jest.Mock;
let mockRecordDeleteRecordById: jest.Mock;
let mockRecordAddRecordToPatient: jest.Mock;
let mockRecordUpdateRecord: jest.Mock;

beforeEach(() => {
    mockRecordGetAllRecords = jest.fn().mockReturnValue(records);
    mockRecordGetRecordsByPatientUserName = jest.fn().mockReturnValue([records[0]]);
    mockRecordDeleteRecordById = jest.fn();
    mockRecordAddRecordToPatient = jest.fn();
    mockRecordUpdateRecord = jest.fn();

    recordDb.getAllRecords = mockRecordGetAllRecords;
    recordDb.getRecordsByPatientUserName = mockRecordGetRecordsByPatientUserName;
    recordDb.deleteRecordById = mockRecordDeleteRecordById;
    recordDb.addRecordToPatient = mockRecordAddRecordToPatient;
    recordDb.updateRecord = mockRecordUpdateRecord;
});

afterEach(() => {
    jest.clearAllMocks(); 
})

test('given: a list of records, when: records are called, then: records list is returned', async () => {
    const result = await recordService.getAllRecords('adminUser', 'admin');

    expect(result).toEqual(records);
    expect(mockRecordGetAllRecords).toHaveBeenCalledTimes(1);
});

test('given: a patient user, when: getAllRecords is called, then: patient records are returned', async () => {
    const result = await recordService.getAllRecords('patientUser', 'patient');

    expect(result).toEqual([records[0]]);
    expect(mockRecordGetRecordsByPatientUserName).toHaveBeenCalledWith({ userName: 'patientUser' });
});

test('given: an unauthorized role, when: getAllRecords is called, then: an error is thrown', async () => {
    await expect(recordService.getAllRecords('unauthorizedUser', 'guest')).rejects.toThrow(UnauthorizedError);
});

test('given: a record id, when: deleteRecordById is called, then: the record is deleted', async () => {
    await recordService.deleteRecordById({ id: 1 });

    expect(mockRecordDeleteRecordById).toHaveBeenCalledWith({ id: 1 });
});

test('given: a patient id and record input, when: makeRecord is called, then: the record is created', async () => {
    const recordInput = { id: 3, title: "New Record", description: "New Description" };
    const newRecord = new Record({ id: 3, title: "New Record", description: "New Description" });

    const result = await recordService.makeRecord({ id: 1, record: recordInput });

    expect(result).toEqual(newRecord);
    expect(mockRecordAddRecordToPatient).toHaveBeenCalledWith({ patientId: 1, record: newRecord });
});

test('given: a record id and record input, when: updateRecord is called, then: the record is updated', async () => {
    const recordInput = { title: "Updated Title", description: "Updated Description" };
    const updatedRecord = new Record({ title: "Updated Title", description: "Updated Description" });

    const result = await recordService.updateRecord({ recordId: 1, record: recordInput });

    expect(result).toEqual(updatedRecord);
    expect(mockRecordUpdateRecord).toHaveBeenCalledWith({ recordId: 1, record: updatedRecord });
});