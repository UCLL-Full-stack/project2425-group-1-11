import { Patient } from '../../model/patient';
import { User } from '../../model/user';
import patientDb from '../../repository/patient.db';
import patientService from '../../service/patient.service';

const userPatient = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "patient"})

const patient = new Patient({id: 1, user: userPatient, records: []})

const patients = [
    new Patient({id: 1, user: userPatient, records: []})
];

let mockPatientDbGetAllPatients: jest.Mock;
let mockPatientDbGetPatientByUserId: jest.Mock;

beforeEach(() => {
    mockPatientDbGetAllPatients = jest.fn().mockReturnValue(patients);
    mockPatientDbGetPatientByUserId = jest.fn().mockReturnValue(patient);

    patientDb.getAllPatients = mockPatientDbGetAllPatients;
    patientDb.getPatientByUserId = mockPatientDbGetPatientByUserId;
    
});

afterEach(() => {
    jest.clearAllMocks();
})

test('given: a list of doctors, when: doctors are called, then: doctors list is returned', () => {
    const result = patientService.getAllPatients();

    expect(result).toEqual(patients);
});

test('given: a userId, when: getDoctorByUserId is called, then: the doctor is returned', async () => {
    const result = await patientService.getPatientByUserId({ userId: 1 });

    expect(result).toEqual(patient);
    expect(mockPatientDbGetPatientByUserId).toHaveBeenCalledWith({ userId: 1 });
});