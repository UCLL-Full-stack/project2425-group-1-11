import { Appointment } from "../../model/appointment"
import { Doctor } from "../../model/doctor"
import { Pacient } from "../../model/pacient"
import { Record } from "../../model/record"
import { User } from "../../model/user"

const userDoctor1 = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})
const userPacient1 = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "pacient"})

const pacient1 = new Pacient({id: 1, user: userPacient1, records: [], appointments: []})
const doctor1 = new Doctor({id: 1, user: userDoctor1, department: "clinical psychology", appointments: []})

const appointment = new Appointment({id: 1, startDate: new Date('2027-10-30'), endDate: new Date('2027-11-30'), comment: "Mild heart burn, sore throat.", pacient: pacient1, doctor: doctor1})

const record = new Record({id: 1, pacient: pacient1, title: "Title 1", description: "Description about title 1."})

const user = userDoctor1;
const records = [record];
const appointments = [appointment]

const pacient = new Pacient({user: user, records: records, appointments: appointments})

test('given: valid values for pacient, when: pacient is created, then: pacient is created with those values', () => {
    expect(pacient.getUser()).toEqual(user);
    expect(pacient.getRecords()).toEqual(records);
    expect(pacient.getAppointments()).toEqual(appointments);
});