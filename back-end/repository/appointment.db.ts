import { Appointment } from '../model/appointment';
import { Doctor } from '../model/doctor';
import { Patient } from '../model/patient';
import { User } from '../model/user';

const userPatient1 = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "patient"})
const userDoctor1 = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const userPatient2 = new User({id: 2, userName: "Paki", firstName: "Corner", lastName: "Shop", email: "cornershop@furquan.com", password: "corner12", role: "patient"})
const userDoctor2 = new User({id: 2, userName: "Chess", firstName: "Andrew", lastName: "Tate", email: "andrewtate@gmail.com", password: "andrew13", role: "doctor"})

const patient1 = new Patient({id: 1, user: userPatient1, appointments: []})
const doctor1 = new Doctor({id: 1, user: userDoctor1, department: "clinical psychology", appointments: []})

const patient2 = new Patient({id: 2, user: userPatient2, appointments: []})
const doctor2 = new Doctor({id: 2, user: userDoctor2, department: "kickboxer", appointments: []})

const appointments = [
    new Appointment({id: 1, startDate: new Date('2027-10-30'), endDate: new Date('2027-11-30'), comment: "Mild heart burn, sore throat.", patient: patient1, doctor: doctor1}),
    new Appointment({id: 2, startDate: new Date('2028-10-30'), endDate: new Date('2028-11-30'), comment: "He is displaying signs of fever.", patient: patient2, doctor: doctor2})
];

const getAllAppointments = (): Appointment[] => appointments;

const deleteAppointmentById = (id: number): void => {
    const appointment = appointments.find(appointment => appointment.getId() === id);
    if (appointment) {
        const index = appointments.indexOf(appointment, 1);
        if (index) {
            appointments.splice(index, 1);
        }
    }
};

export default {
    getAllAppointments,
    deleteAppointmentById,
};