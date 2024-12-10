import { Appointment } from "../../model/appointment"
import { Clinic } from "../../model/clinic"
import { Doctor } from "../../model/doctor"
import { Patient } from "../../model/patient"
import { User } from "../../model/user"

const userPatient1 = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "patient"})
const userDoctor1 = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const patient1 = new Patient({id: 1, user: userPatient1, records: []})
const doctor1 = new Doctor({id: 1, user: userDoctor1, department: "clinical psychology"})

const start = new Date('2027-10-30');
const end = new Date('2027-11-30');
const comment = "Mild heart burn, sore throat."
const patient = patient1
const doctor = doctor1

const appointment = new Appointment({startDate: start, endDate: end, comment: comment, patient: patient, doctor: doctor})

test('given: valid values for appointment, when: appointment is created, then: appointment is created with those values', () => {
    expect(appointment.getStartDate()).toEqual(start);
    expect(appointment.getEndDate()).toEqual(end);
    expect(appointment.getComment()).toEqual(comment);
    expect(appointment.getPatient()).toEqual(patient);
    expect(appointment.getDoctor()).toEqual(doctor);
});

test('given: invalid values for appointment, when: appointment startDate is empty, then: appropriated error is returned', () => {
    const appointment = () => 
        new Appointment({ startDate: undefined as unknown as Date, endDate: end, comment: comment, patient: patient, doctor: doctor });

    expect(appointment).toThrow('Start and end date are required.');
});

test('given: invalid values for appointment, when: appointment endDate is empty, then: appropriated error is returned', () => {
    const appointment = () => 
        new Appointment({ startDate: start, endDate: undefined as unknown as Date, comment: comment, patient: patient, doctor: doctor });

    expect(appointment).toThrow('Start and end date are required.');
});

test('given: invalid values for appointment, when: appointment startDate is after endDate, then: appropriated error is returned', () => {
    const appointment = () => 
        new Appointment({ startDate: start, endDate: new Date("2027-9-30"), comment: comment, patient: patient, doctor: doctor });

    expect(appointment).toThrow('Start date cannot be after end date.');
});

test('given: invalid values for appointment, when: appointment Comment is empty, then: appropriated error is returned', () => {
    const appointment = () => 
        new Appointment({ startDate: start, endDate: end, comment: "", patient: patient, doctor: doctor });

    expect(appointment).toThrow('Comment is required.');
});