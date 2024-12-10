import { Appointment } from "../../model/appointment"
import { Clinic } from "../../model/clinic"
import { Doctor } from "../../model/doctor"
import { Patient } from "../../model/patient"
import { Record } from "../../model/record"
import { User } from "../../model/user"

const userDoctor1 = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const record = new Record({id: 1, title: "Title 1", description: "Description about title 1."})

const user = userDoctor1;
const records = [record];

const patient = new Patient({user: user, records: records})

test('given: valid values for patient, when: patient is created, then: patient is created with those values', () => {
    expect(patient.getUser()).toEqual(user);
    expect(patient.getRecords()).toEqual(records);
});

test('given: invalid values for patient, when: patient user is missing, then: appropriated error is returned', () => {
    const patient = () => 
        new Patient({user: undefined as unknown as User, records: records})

    expect(patient).toThrow('No User defined.');
});

test('given: invalid values for patient, when: patient records are missing, then: appropriated error is returned', () => {
    const patient = () => 
        new Patient({user: user, records: null as unknown as Record[]})

    expect(patient).toThrow('There are no records for this user.');
});