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

beforeEach(() => {
    mockDoctorDbGetAllDoctors = jest.fn().mockReturnValue(doctors);

    doctorDb.getAllDoctors = mockDoctorDbGetAllDoctors;
});

afterEach(() => {
    jest.clearAllMocks();
})

test('given: a list of doctors, when: doctors are called, then: doctors list is returned', () => {
    const result = doctorService.getAllDoctors();

    expect(result).toEqual(doctors);
});