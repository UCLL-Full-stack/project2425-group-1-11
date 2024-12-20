import { Doctor } from '../../model/doctor';
import { User } from '../../model/user';
import doctorDb from '../../repository/doctor.db';
import doctorService from '../../service/doctor.service';

const userDoctor = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const doctor = new Doctor({id: 1, user: userDoctor, department: "clinical psychology"})

const doctors = [
    new Doctor({id: 1, user: userDoctor, department: "clinical psychology"})
];

let mockDoctorDbGetAllDoctors: jest.Mock;
let mockDoctorDbGetDoctorByUserId: jest.Mock;
let mockDoctorDbGetDoctorById: jest.Mock;

beforeEach(() => {
    mockDoctorDbGetAllDoctors = jest.fn().mockReturnValue(doctors);
    mockDoctorDbGetDoctorByUserId = jest.fn().mockReturnValue(doctor);
    mockDoctorDbGetDoctorById = jest.fn().mockReturnValue(doctor);

    doctorDb.getAllDoctors = mockDoctorDbGetAllDoctors;
    doctorDb.getDoctorByUserId = mockDoctorDbGetDoctorByUserId;
    doctorDb.getDoctorById = mockDoctorDbGetDoctorById;
});
 
afterEach(() => {
    jest.clearAllMocks();
})

test('given: a list of doctors, when: doctors are called, then: doctors list is returned', () => {
    const result = doctorService.getAllDoctors();

    expect(result).toEqual(doctors);
});

test('given: a userId, when: getDoctorByUserId is called, then: the doctor is returned', async () => {
    const result = await doctorService.getDoctorByUserId({ userId: 1 });

    expect(result).toEqual(doctor);
    expect(mockDoctorDbGetDoctorByUserId).toHaveBeenCalledWith({ userId: 1 });
});

test('given: an id, when: getDoctorById is called, then: the doctor is returned', async () => {
    const result = await doctorService.getDoctorById({ id: 1 });

    expect(result).toEqual(doctor);
    expect(mockDoctorDbGetDoctorById).toHaveBeenCalledWith({ id: 1 });
});

test('given: an invalid id, when: getDoctorById is called, then: an error is thrown', async () => {
    mockDoctorDbGetDoctorById.mockReturnValueOnce(null);

    await expect(doctorService.getDoctorById({ id: 999 })).rejects.toThrow('Doctor with id 999 not found');
    expect(mockDoctorDbGetDoctorById).toHaveBeenCalledWith({ id: 999 });
});