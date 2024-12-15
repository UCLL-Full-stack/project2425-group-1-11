import { Appointment } from "../../model/appointment"
import { Doctor } from "../../model/doctor"
import { Patient } from "../../model/patient"
import { User } from "../../model/user"
import appointmentDb from "../../repository/appointment.db";
import doctorDb from "../../repository/doctor.db";
import patientDb from "../../repository/patient.db";
import appointmentService from '../../service/appointment.service';
import { AppointmentInput } from "../../types";

const userPatient = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "patient"})
const userDoctor = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const patient = new Patient({id: 1, user: userPatient, records: []})
const doctor = new Doctor({id: 1, user: userDoctor, department: "clinical psychology"})

const appointment = new Appointment({id: 1, startDate: new Date('2027-10-30'), endDate: new Date('2027-11-30'), comment: "Mild heart burn, sore throat.", patient: patient, doctor: doctor})


const appointments = [
    new Appointment({id: 1, startDate: new Date('2027-10-30'), endDate: new Date('2027-11-30'), comment: "Mild heart burn, sore throat.", patient: patient, doctor: doctor}),
];

let mockAppointmentDbGetAllAppointments: jest.Mock;
let mockAppointmentDbDeleteAppointmentById: jest.Mock;
let mockAppointmentDbMakeAppointment: jest.Mock;
let mockPatientDbGetPatientById: jest.Mock;
let mockDoctorDbGetDoctorById: jest.Mock;

beforeEach(() => {
    mockAppointmentDbGetAllAppointments = jest.fn().mockReturnValue(appointments);
    mockAppointmentDbDeleteAppointmentById = jest.fn();
    mockAppointmentDbMakeAppointment = jest.fn().mockReturnValue(appointment)
    mockPatientDbGetPatientById = jest.fn().mockImplementation(({ id }) => id === patient.getId() ? patient : undefined);
    mockDoctorDbGetDoctorById = jest.fn().mockImplementation(({ id }) => id === doctor.getId() ? doctor : undefined);

    appointmentDb.getAllAppointments = mockAppointmentDbGetAllAppointments;
    appointmentDb.deleteAppointmentById = mockAppointmentDbDeleteAppointmentById;
    appointmentDb.saveAppointment = mockAppointmentDbMakeAppointment;
    patientDb.getPatientById = mockPatientDbGetPatientById;
    doctorDb.getDoctorById = mockDoctorDbGetDoctorById;
});

afterEach(() => {
    jest.clearAllMocks();
})

test('given: a list of appointments, when: appointments are called, then: appointments list is returned', () => {
    const result = appointmentService.getAllAppointments();

    expect(result).toEqual(appointments);
});

test('given: an appointment, when: appointment is deleted, then: appointment is deleted', () => {
    const mockId = 2;

    appointmentService.deleteAppointmentById({ id: mockId });

    expect(appointmentDb.deleteAppointmentById).toHaveBeenCalledTimes(1);
});

test('given: input for appointment, when: appointment is created, then: appointment is saved in the database', async () => {
    const appointmentInput: AppointmentInput = {
        id: 1,
        startDate: new Date('2027-10-30T00:00:00.000Z'),
        endDate: new Date('2027-11-30T00:00:00.000Z'),
        comment: 'Mild heart burn, sore throat.',
        patientId: 1,
        doctorId: 1,
    };

    const result = await appointmentService.makeAppointment(appointmentInput);

    expect(patientDb.getPatientById).toHaveBeenCalledWith({ id: appointmentInput.patientId });
    expect(doctorDb.getDoctorById).toHaveBeenCalledWith({ id: appointmentInput.doctorId });
    expect(appointmentDb.saveAppointment).toHaveBeenCalledWith(expect.objectContaining({
        startDate: new Date(appointmentInput.startDate),
        endDate: new Date(appointmentInput.endDate),
        comment: appointmentInput.comment,
        patient: expect.objectContaining({ id: appointmentInput.patientId }),
        doctor: expect.objectContaining({ id: appointmentInput.doctorId }),
    }));
    expect(result).toMatchObject(appointment);
});

test('given: input for appointment with past start date, when: appointment is created, then: error is thrown', async () => {
    const appointmentInput: AppointmentInput = {
        startDate: new Date('2020-10-30T00:00:00.000Z'),
        endDate: new Date('2027-11-30T00:00:00.000Z'),
        comment: 'Mild heart burn, sore throat.',
        patientId: 1,
        doctorId: 1,
    };

    await expect(appointmentService.makeAppointment(appointmentInput)).rejects.toThrow('Start date must be in the future');
});

test('given: input for appointment with end date before start date, when: appointment is created, then: error is thrown', async () => {
    const appointmentInput: AppointmentInput = {
        startDate: new Date('2027-11-30T00:00:00.000Z'),
        endDate: new Date('2027-10-30T00:00:00.000Z'),
        comment: 'Mild heart burn, sore throat.',
        patientId: 1,
        doctorId: 1,
    };

    await expect(appointmentService.makeAppointment(appointmentInput)).rejects.toThrow('End date must be after the start date');
});

test('given: input for appointment without patient ID, when: appointment is created, then: error is thrown', async () => {
    const appointmentInput: AppointmentInput = {
        startDate: new Date('2027-10-30T00:00:00.000Z'),
        endDate: new Date('2027-11-30T00:00:00.000Z'),
        comment: 'Mild heart burn, sore throat.',
        patientId: 0,
        doctorId: 1,
    };

    await expect(appointmentService.makeAppointment(appointmentInput)).rejects.toThrow('Patient ID is required');
});

test('given: input for appointment without patient ID, when: appointment is created, then: error is thrown', async () => {
    const appointmentInput: AppointmentInput = {
        startDate: new Date('2027-10-30T00:00:00.000Z'),
        endDate: new Date('2027-11-30T00:00:00.000Z'),
        comment: 'Mild heart burn, sore throat.',
        patientId: 10,
        doctorId: 1,
    };

    await expect(appointmentService.makeAppointment(appointmentInput)).rejects.toThrow('Patient not found');
});

test('given: input for appointment without doctor ID, when: appointment is created, then: error is thrown', async () => {
    const appointmentInput: AppointmentInput = {
        startDate: new Date('2027-10-30T00:00:00.000Z'),
        endDate: new Date('2027-11-30T00:00:00.000Z'),
        comment: 'Mild heart burn, sore throat.',
        patientId: 1,
        doctorId: 0,
    };

    await expect(appointmentService.makeAppointment(appointmentInput)).rejects.toThrow('Doctor ID is required');
});

test('given: input for appointment without doctor ID, when: appointment is created, then: error is thrown', async () => {
    const appointmentInput: AppointmentInput = {
        startDate: new Date('2027-10-30T00:00:00.000Z'),
        endDate: new Date('2027-11-30T00:00:00.000Z'),
        comment: 'Mild heart burn, sore throat.',
        patientId: 1,
        doctorId: 10,
    };

    await expect(appointmentService.makeAppointment(appointmentInput)).rejects.toThrow('Doctor not found');
});