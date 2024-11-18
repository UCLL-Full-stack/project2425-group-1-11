import { Appointment } from "../../model/appointment"
import { Doctor } from "../../model/doctor"
import { Patient } from "../../model/patient"
import { Record } from "../../model/record"
import { User } from "../../model/user"

const userDoctor1 = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})
const userPatient1 = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "patient"})

const patient1 = new Patient({id: 1, user: userPatient1, records: [], appointments: []})
const doctor1 = new Doctor({id: 1, user: userDoctor1, department: "clinical psychology", appointments: []})

const appointment = new Appointment({id: 1, startDate: new Date('2027-10-30'), endDate: new Date('2027-11-30'), comment: "Mild heart burn, sore throat.", patient: patient1, doctor: doctor1})

const record = new Record({id: 1, patient: patient1, title: "Title 1", description: "Description about title 1."})

const user = userDoctor1;
const records = [record];
const appointments = [appointment]

const patient = new Patient({user: user, records: records, appointments: appointments})

test('given: valid values for patient, when: patient is created, then: patient is created with those values', () => {
    expect(patient.getUser()).toEqual(user);
    expect(patient.getRecords()).toEqual(records);
    expect(patient.getAppointments()).toEqual(appointments);
});

test('given: invalid values for patient, when: patient user is missing, then: appropriated error is returned', () => {
    const patient = () => 
        new Patient({user: undefined as unknown as User, records: records, appointments: appointments})

    expect(patient).toThrow('No User defined.');
});

test('given: invalid values for patient, when: patient records are missing, then: appropriated error is returned', () => {
    const patient = () => 
        new Patient({user: user, records: null as unknown as Record[], appointments: appointments})

    expect(patient).toThrow('There are no records for this user.');
});

test('given: invalid values for patient, when: patient appointments are missing, then: appropriated error is returned', () => {
    const patient = () => 
        new Patient({user: user, records: records, appointments: null as unknown as Appointment[]})

    expect(patient).toThrow('There are no appointments for this user.');
});