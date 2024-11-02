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

