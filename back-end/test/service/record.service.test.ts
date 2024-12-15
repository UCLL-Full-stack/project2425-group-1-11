import { Record } from '../../model/record';
import recordDb from '../../repository/record.db';
import recordService from '../../service/record.service';

const record = new Record({id: 1, title: 'Title1', description: 'Description1',})

const records = [
    new Record({id: 1, title: 'Title1', description: 'Description1',})
];

let mockRecordGetAllRecords: jest.Mock;
let mockRecordDeleteRecordById: jest.Mock;

beforeEach(() => {
    mockRecordGetAllRecords = jest.fn().mockReturnValue(records);
    mockRecordDeleteRecordById = jest.fn()

    recordDb.getAllRecords = mockRecordGetAllRecords;
    recordDb.deleteRecordById = mockRecordDeleteRecordById;
});

afterEach(() => {
    jest.clearAllMocks();
})

test('given: a list of records, when: records are called, then: records list is returned', () => {
    const result = recordService.getAllRecords();

    expect(result).toEqual(records);
});

test('given: an record, when: record is deleted, then: record is deleted', () => {
    const mockId = 2;

    recordService.deleteRecordById({ id: mockId });

    expect(recordDb.deleteRecordById).toHaveBeenCalledTimes(1);
});