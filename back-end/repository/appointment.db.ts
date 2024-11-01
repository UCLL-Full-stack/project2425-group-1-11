import { Appointment } from '../model/appointment';
import { Doctor } from '../model/doctor';
import { Pacient } from '../model/pacient';
import { User } from '../model/user';

const userPacient1 = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "pacient"})
const userDoctor1 = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const userPacient2 = new User({id: 2, userName: "Paki", firstName: "Corner", lastName: "Shop", email: "cornershop@furquan.com", password: "corner12", role: "pacient"})
const userDoctor2 = new User({id: 2, userName: "Chess", firstName: "Andrew", lastName: "Tate", email: "andrewtate@gmail.com", password: "andrew13", role: "doctor"})

const pacient1 = new Pacient({id: 1, user: userPacient1, records: [], appointments: []})
const doctor1 = new Doctor({id: 1, user: userDoctor1, department: "clinical psychology", appointments: []})

const pacient2 = new Pacient({id: 2, user: userPacient2, records: [], appointments: []})
const doctor2 = new Doctor({id: 2, user: userDoctor2, department: "kickboxer", appointments: []})

const appointments = [
    new Appointment({
        id: 1,
        startDate: new Date('2027-10-30'),
        endDate: new Date('2027-11-30'),
        comment: "Mild heart burn, sore throat.",
        pacient: pacient1,
        doctor: doctor1,
    }),
    new Appointment({
        id: 2,
        startDate: new Date('2028-10-30'),
        endDate: new Date('2028-11-30'),
        comment: "He is displaying signs of fever.",
        pacient: pacient2,
        doctor: doctor2,
    }),
];

const getAllAppointments = (): Appointment[] => appointments;

export default {
    getAllAppointments,
};