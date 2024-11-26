import { User } from "../../model/user"
import { Role } from "../../types";

const userName = "Freakiest";
const firstName = "Freak";
const lastName = "Bob";
const email = "freakbob@irina.com";
const password = "freak8";
const role = "patient";

const user = new User({userName: userName, firstName: firstName, lastName: lastName, email: email, password: password, role: role})

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    expect(user.getUsername()).toEqual(userName);
    expect(user.getFirstName()).toEqual(firstName);
    expect(user.getLastName()).toEqual(lastName);
    expect(user.getEmail()).toEqual(email);
    expect(user.getPassword()).toEqual(password);
    expect(user.getRole()).toEqual(role);
});

test('given: invalid values for user, when: user userName is missing, then: appropriated error is returned', () => {
    const user = () => 
        new User({userName: "", firstName: firstName, lastName: lastName, email: email, password: password, role: role})

    expect(user).toThrow('Username is required.');
});

test('given: invalid values for user, when: user firstName is missing, then: appropriated error is returned', () => {
    const user = () => 
        new User({userName: userName, firstName: "", lastName: lastName, email: email, password: password, role: role})

    expect(user).toThrow('First name is required.');
});

test('given: invalid values for user, when: user lastName is missing, then: appropriated error is returned', () => {
    const user = () => 
        new User({userName: userName, firstName: firstName, lastName: "", email: email, password: password, role: role})

    expect(user).toThrow('Last name is required.');
});

test('given: invalid values for user, when: user email is missing, then: appropriated error is returned', () => {
    const user = () => 
        new User({userName: userName, firstName: firstName, lastName: lastName, email: "", password: password, role: role})

    expect(user).toThrow('Email is required.');
});

test('given: invalid values for user, when: user password is missing, then: appropriated error is returned', () => {
    const user = () => 
        new User({userName: userName, firstName: firstName, lastName: lastName, email: email, password: "", role: role})

    expect(user).toThrow('Password is required.');
});

test('given: invalid values for user, when: user role is missing, then: appropriated error is returned', () => {
    const user = () => 
        new User({userName: userName, firstName: firstName, lastName: lastName, email: email, password: password, role: undefined as unknown as Role})

    expect(user).toThrow('Role is required.');
});