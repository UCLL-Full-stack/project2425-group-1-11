import { set } from "date-fns"
import { Appointment } from "../../model/appointment"
import { Doctor } from "../../model/doctor"
import { Pacient } from "../../model/pacient"
import { User } from "../../model/user"

const userPacient1 = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "pacient"})
const userDoctor1 = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const pacient1 = new Pacient({id: 1, user: userPacient1, records: [], appointments: []})
const doctor1 = new Doctor({id: 1, user: userDoctor1, department: "clinical psychology", appointments: []})

const start = new Date('2027-10-30');
const end = new Date('2027-11-30');
const comment = "Mild heart burn, sore throat."
const pacient = pacient1
const doctor = doctor1

const appointment = new Appointment({startDate: start, endDate: end, comment: comment, pacient: pacient, doctor: doctor})

test('given: valid values for appointment, when: appointment is created, then: appointment is created with those values', () => {
    expect(appointment.getStartDate()).toEqual(start);
    expect(appointment.getEndDate()).toEqual(end);
    expect(appointment.getComment()).toEqual(comment);
    expect(appointment.getPacient()).toEqual(pacient);
    expect(appointment.getDoctor()).toEqual(doctor);
});

test('given: invalid values for appointment, when: appointment startDate is empty, then: appropriated error is returned', () => {
    const appointment = () => 
        new Appointment({ startDate: undefined as unknown as Date, endDate: end, comment: comment, pacient: pacient, doctor: doctor });

    expect(appointment).toThrow('Start and end date are required.');
});

test('given: invalid values for appointment, when: appointment endDate is empty, then: appropriated error is returned', () => {
    const appointment = () => 
        new Appointment({ startDate: start, endDate: undefined as unknown as Date, comment: comment, pacient: pacient, doctor: doctor });

    expect(appointment).toThrow('Start and end date are required.');
});

test('given: invalid values for appointment, when: appointment startDate is after endDate, then: appropriated error is returned', () => {
    const invalidEndDate = set(new Date(), { hours: 7, minutes: 30 });
    const appointment = () => 
        new Appointment({ startDate: start, endDate: invalidEndDate, comment: comment, pacient: pacient, doctor: doctor });

    expect(appointment).toThrow('Start date cannot be after end date.');
});

test('given: invalid values for appointment, when: appointment Comment is empty, then: appropriated error is returned', () => {
    const appointment = () => 
        new Appointment({ startDate: start, endDate: end, comment: "", pacient: pacient, doctor: doctor });

    expect(appointment).toThrow('Comment is required.');
});

test('given: invalid values for appointment, when: appointment Pacient is empty, then: appropriated error is returned', () => {
    const appointment = () => 
        new Appointment({ startDate: start, endDate: end, comment: comment, pacient: undefined as unknown as Pacient, doctor: doctor });

    expect(appointment).toThrow('Pacient is required.');
});

test('given: invalid values for appointment, when: appointment Doctor is empty, then: appropriated error is returned', () => {
    const appointment = () => 
        new Appointment({ startDate: start, endDate: end, comment: comment, pacient: pacient, doctor: undefined as unknown as Doctor});

    expect(appointment).toThrow('Doctor is required.');
});