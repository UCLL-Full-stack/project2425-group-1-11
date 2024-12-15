import { Clinic } from '../../model/clinic';
import { Doctor } from '../../model/doctor';
import { User } from '../../model/user';
import clinicDb from '../../repository/clinic.db';
import clinicService from '../../service/clinic.service';

const userDoctor = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const doctor = new Doctor({id: 1, user: userDoctor, department: "clinical psychology"})

const doctors = [
    new Doctor({id: 1, user: userDoctor, department: "clinical psychology"})
];

const clinic = new Clinic({id: 1, doctors: doctors, address: 'Geldenaaksebaan 335, 3001 Leuven', contactNumber: 16375700, rating: 7.5})

const clinics = [
    new Clinic({id: 1, doctors: doctors, address: 'Geldenaaksebaan 335, 3001 Leuven', contactNumber: 16375700, rating: 7.5})
]

let mockClinicDbGetAllClinics: jest.Mock;


beforeEach(() => {
    mockClinicDbGetAllClinics = jest.fn().mockReturnValue(clinics);

    clinicDb.getAllClinics = mockClinicDbGetAllClinics;
});

afterEach(() => {
    jest.clearAllMocks();
})

test('given: a list of clinics, when: clinics are called, then: clinics list is returned', () => {
    const result = clinicService.getAllClinics();

    expect(result).toEqual(clinics);
});