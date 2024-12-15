import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import userService from '../../service/user.service';
import { Role, UserInput } from '../../types';

const userPatient = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "patient"})
const userDoctor = new User({id: 2, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})

const users = [
    new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "patient"}),
    new User({id: 1, userName: "Dr.Phil", firstName: "Phil", lastName: "McGraw", email: "philmcgraw@gmail.com", password: "phil222", role: "doctor"})
];

let mockUserGetAllUsers: jest.Mock;
let mockUsersGetUserByUsername: jest.Mock;
let mockUsersGetUserByEmail: jest.Mock;
let mockUserLogin: jest.Mock;

beforeEach(() => {
    mockUserGetAllUsers = jest.fn().mockReturnValue(users);
    mockUsersGetUserByUsername = jest.fn().mockImplementation(({ userName }) => {
        if (userName === userPatient.getUserName()) {return userPatient}
        if (userName === userDoctor.getUserName()) {return userDoctor}
        else {return undefined}
    });
    mockUsersGetUserByEmail = jest.fn().mockImplementation(({ email }) => {
        if (email === userPatient.getEmail()) {return userPatient}
        if (email === userDoctor.getEmail()) {return userDoctor}
        else {return undefined}
    });
    mockUserLogin = jest.fn()

    userDb.getAllUsers = mockUserGetAllUsers;
    userDb.getUserByUserName = mockUsersGetUserByUsername;
    userDb.getUserByEmail = mockUsersGetUserByEmail;
});

afterEach(() => {
    jest.clearAllMocks();
})

test('given: a list of users, when: users are called, then: users list is returned', () => {
    const result = userService.getAllUsers();

    expect(result).toEqual(users);
});

test('given: input for user with existing username, when: user is created, then: error is thrown', async () => {
    const userPatientInput: UserInput = {
        userName: "Freakiest", 
        firstName: "Freak", 
        lastName: "Bob", 
        email: "freakbob@ucll.be", 
        password: "freak8", 
        role: "patient",
    };

    const userDoctorInput: UserInput = {
        userName: "Dr.Phil", 
        firstName: "Phil", 
        lastName: "McGraw", 
        email: "philmcgraw@ucll.com", 
        password: "phil222", 
        role: "doctor",
    };

    await expect(userService.makeUser(userPatientInput)).rejects.toThrow(`User with username ${userPatientInput.userName} already exists.`);
    await expect(userService.makeUser(userDoctorInput)).rejects.toThrow(`User with username ${userDoctorInput.userName} already exists.`);
});

test('given: input for user with existing email, when: user is created, then: error is thrown', async () => {
    const userPatientInput: UserInput = {
        userName: "Freakiest1", 
        firstName: "Freak", 
        lastName: "Bob", 
        email: "freakbob@irina.com", 
        password: "freak8", 
        role: "patient",
    };

    const userDoctorInput: UserInput = {
        userName: "Dr.Phil1", 
        firstName: "Phil", 
        lastName: "McGraw", 
        email: "philmcgraw@gmail.com", 
        password: "phil222", 
        role: "doctor",
    };

    await expect(userService.makeUser(userPatientInput)).rejects.toThrow(`User with email ${userPatientInput.email} already exists.`);
    await expect(userService.makeUser(userDoctorInput)).rejects.toThrow(`User with email ${userDoctorInput.email} already exists.`);
});

test('given: input for user with existing email, when: user is created, then: error is thrown', async () => {
    const userPatientInput: UserInput = {
        userName: "Freakiest1", 
        firstName: "Freak", 
        lastName: "Bob", 
        email: "freakbob@ucll.be", 
        password: "freak8", 
        role: "lol" as unknown as Role,
    };

    const userDoctorInput: UserInput = {
        userName: "Dr.Phil1", 
        firstName: "Phil", 
        lastName: "McGraw", 
        email: "philmcgraw@ucll.be", 
        password: "phil222", 
        role: "olo" as unknown as Role,
    };

    await expect(userService.makeUser(userPatientInput)).rejects.toThrow(`Role must be patient, doctor or admin`);
    await expect(userService.makeUser(userDoctorInput)).rejects.toThrow(`Role must be patient, doctor or admin`);
});

test('given: input for user, when: user is logging in, then: user is logged in', async () => {
    const userLoginInput = {
        userName: "Freakiest",
        password: "freak8"
    };

    await expect(userService.login(userLoginInput.userName, userLoginInput.password));
});