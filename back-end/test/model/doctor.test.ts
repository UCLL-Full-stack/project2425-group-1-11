import { Appointment } from "../../model/appointment"
import { Doctor } from "../../model/doctor"
import { Pacient } from "../../model/pacient"
import { User } from "../../model/user"

const userDoctor1 = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})
const userPacient1 = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "pacient"})

const pacient1 = new Pacient({id: 1, user: userPacient1, records: [], appointments: []})
const doctor1 = new Doctor({id: 1, user: userDoctor1, department: "clinical psychology", appointments: []})

const appointment = new Appointment({id: 1, startDate: new Date('2027-10-30'), endDate: new Date('2027-11-30'), comment: "Mild heart burn, sore throat.", pacient: pacient1, doctor: doctor1})

const user = userDoctor1;
const department = "clinical psychology";
const appointments = [appointment]

const doctor = new Doctor({user: user, department: department, appointments: appointments})

test('given: valid values for doctor, when: doctor is created, then: doctor is created with those values', () => {
    expect(doctor.getUser()).toEqual(user);
    expect(doctor.getDepartment()).toEqual(department);
    expect(doctor.getAppointments()).toEqual(appointments);
});

test('given: invalid values for doctor, when: doctor user is missing, then: appropriated error is returned', () => {
    const doctor = () => 
        new Doctor({user: undefined as unknown as User, department: department, appointments: appointments})

    expect(doctor).toThrow('No User defined.');
});

test('given: invalid values for doctor, when: doctor department is missing, then: appropriated error is returned', () => {
    const doctor = () => 
        new Doctor({user: user, department: "", appointments: appointments})

    expect(doctor).toThrow('Department is required.');
});

test('given: invalid values for doctor, when: doctor appointments are missing, then: appropriated error is returned', () => {
    const doctor = () => 
        new Doctor({user: user, department: department, appointments: null as unknown as Appointment[]})

    expect(doctor).toThrow('There are no appointments for this user.');
});