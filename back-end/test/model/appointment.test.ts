import { set } from "date-fns"
import { Appointment } from "../../model/appointment"
import { Doctor } from "../../model/doctor"
import { Pacient } from "../../model/pacient"
import { User } from "../../model/user"

const userPacient1 = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "pacient"})
const userDoctor1 = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const pacient1 = new Pacient({id: 1, user: userPacient1, records: [], appointments: []})
const doctor1 = new Doctor({id: 1, user: userDoctor1, department: "clinical psychology", appointments: []})

const appointments = [
    new Appointment({id: 1, startDate: new Date('2027-10-30'), endDate: new Date('2027-11-30'), comment: "Mild heart burn, sore throat.", pacient: pacient1, doctor: doctor1}),
];

const start = new Date('2027-10-30');
const end = new Date('2027-11-30');
const comment = "Mild heart burn, sore throat."
const pacient = pacient1
const doctor = doctor1

const appointment = new Appointment({startDate: start, endDate: end, comment: comment, pacient: pacient, doctor: doctor})

// const validate = Appointment.validate;

test('given: valid values for appointment, when: appointment is created, then: appointment is created with those values', () => {
    expect(appointment.getStartDate()).toEqual(start);
    expect(appointment.getEndDate()).toEqual(end);
    expect(appointment.getComment()).toEqual(comment);
    expect(appointment.getPacient()).toEqual(pacient);
    expect(appointment.getDoctor()).toEqual(doctor);
});

// test('validate should throw an error if startDate is missing', () => {
//     const invalidEndDate = set(new Date(), { hours: 0, minutes: 0 });
//     const invalidAppointment = () => new Appointment({ startDate: invalidEndDate, endDate: end, comment: comment, pacient: pacient, doctor: doctor });

//     expect(invalidAppointment).toThrow('Start and end date are required');
// });

// test('validate should throw an error if endDate is missing', () => {
//     const invalidAppointment = { ...validAppointment, endDate: undefined };
//     expect(() => validate(invalidAppointment)).toThrow('Start and end date are required');
// });

test('given: ', () => {
    const invalidEndDate = set(new Date(), { hours: 7, minutes: 30 });
    const invalidAppointment = () => new Appointment({ startDate: invalidEndDate, endDate: end, comment: comment, pacient: pacient, doctor: doctor });

    expect(invalidAppointment).toThrow('Start date cannot be after end date');
});

// test('validate should throw an error if comment is missing', () => {
//     const invalidAppointment = { ...validAppointment, comment: '' };
//     expect(() => validate(invalidAppointment)).toThrow('comment is required');
// });

// test('validate should throw an error if pacient is missing', () => {
//     const invalidAppointment = { ...validAppointment, pacient: undefined };
//     expect(() => validate(invalidAppointment)).toThrow('pacient is required');
// });

// test('validate should throw an error if doctor is missing', () => {
//     const invalidAppointment = { ...validAppointment, doctor: undefined };
//     expect(() => validate(invalidAppointment)).toThrow('doctor is required');
// });