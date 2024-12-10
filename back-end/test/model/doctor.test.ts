import { Doctor } from "../../model/doctor"
import { User } from "../../model/user"

const userDoctor1 = new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const user = userDoctor1;
const department = "clinical psychology";

const doctor = new Doctor({user: user, department: department})

test('given: valid values for doctor, when: doctor is created, then: doctor is created with those values', () => {
    expect(doctor.getUser()).toEqual(user);
    expect(doctor.getDepartment()).toEqual(department);
});

test('given: invalid values for doctor, when: doctor user is missing, then: appropriated error is returned', () => {
    const doctor = () => 
        new Doctor({user: undefined as unknown as User, department: department})

    expect(doctor).toThrow('No User defined.');
});

test('given: invalid values for doctor, when: doctor department is missing, then: appropriated error is returned', () => {
    const doctor = () => 
        new Doctor({user: user, department: ""})

    expect(doctor).toThrow('Department is required.');
});