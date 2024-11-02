import { Appointment } from "../../model/appointment"
import { Doctor } from "../../model/doctor"
import { Pacient } from "../../model/pacient"
import { User } from "../../model/user"
import appointmentDb from "../../repository/appointment.db";
import appointmentService from '../../service/appointment.service';

const userPacient = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "pacient"})
const userDoctor = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const pacient = new Pacient({id: 1, user: userPacient, records: [], appointments: []})
const doctor = new Doctor({id: 1, user: userDoctor, department: "clinical psychology", appointments: []})

const appointments = [
    new Appointment({id: 1, startDate: new Date('2027-10-30'), endDate: new Date('2027-11-30'), comment: "Mild heart burn, sore throat.", pacient: pacient, doctor: doctor}),
];

let mockAppointmentDbGetAllAppointments: jest.Mock
let mockAppointmentDbDeleteAppointmentById: jest.Mock

beforeEach(() => {
    mockAppointmentDbGetAllAppointments = jest.fn().mockReturnValue(appointments);
    mockAppointmentDbDeleteAppointmentById = jest.fn();

    appointmentDb.getAllAppointments = mockAppointmentDbGetAllAppointments;
    appointmentDb.deleteAppointmentById = mockAppointmentDbDeleteAppointmentById;
});

afterEach(() => {
    jest.clearAllMocks();
})

test('given: a list of appointments, when: appointments are called, then: appointments list is returned', () => {
    const result = appointmentService.getAllAppointments();

    expect(result).toEqual(appointments);
});

test('given: a list of appointments, when: appointment is deleted, then: appointment is deleted from list', () => {
    const mockId = 2;

    appointmentService.deleteAppointmentById(mockId);

    expect(appointmentDb.deleteAppointmentById).toHaveBeenCalledTimes(1);
});