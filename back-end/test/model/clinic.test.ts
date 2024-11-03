import { Doctor } from "../../model/doctor"
import { User } from "../../model/user"
import { Clinic } from '../../model/clinic';

const userDoctor1 = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const doctor1 = new Doctor({id: 1, user: userDoctor1, department: "clinical psychology", appointments: []})

const doctors = [doctor1];
const address = "Geldenaaksebaan 335, 3001 Leuven";
const contactNumber = 123456789
const rating = 5

const clinic = new Clinic({doctors: doctors, address: address, contactNumber: contactNumber, rating: rating})

test('given: valid values for clinic, when: clinic is created, then: clinic is created with those values', () => {
    expect(clinic.getDoctors()).toEqual(doctors);
    expect(clinic.getAddress()).toEqual(address);
    expect(clinic.getContactNumber()).toEqual(contactNumber);
    expect(clinic.getRating()).toEqual(rating);
});

test('given: invalid values for clinic, when: clinic doctors are missing, then: appropriated error is returned', () => {
    const clinic = () => 
        new Clinic({doctors: null as unknown as Doctor[], address: address, contactNumber: contactNumber, rating: rating})

    expect(clinic).toThrow('No doctors found.');
});

test('given: invalid values for clinic, when: clinic address is missing, then: appropriated error is returned', () => {
    const clinic = () => 
        new Clinic({doctors: doctors, address: "", contactNumber: contactNumber, rating: rating})

    expect(clinic).toThrow('No address defined.');
});

test('given: invalid values for clinic, when: clinic contactNumber is missing, then: appropriated error is returned', () => {
    const clinic = () => 
        new Clinic({doctors: doctors, address: address, contactNumber: 0, rating: rating})

    expect(clinic).toThrow('There is no contactNumber.');
});

test('given: invalid values for clinic, when: clinic rating is missing, then: appropriated error is returned', () => {
    const clinic = () => 
        new Clinic({doctors: doctors, address: address, contactNumber: contactNumber, rating: 0})

    expect(clinic).toThrow('There is no rating.');
});