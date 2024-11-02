import { User } from "../../model/user"

const userName = "Freakiest";
const firstName = "Freak";
const lastName = "Bob";
const email = "freakbob@irina.com";
const password = "freak8";
const role = "pacient";

const user = new User({userName: userName, firstName: firstName, lastName: lastName, email: email, password: password, role: role})

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    expect(user.getUsername()).toEqual(userName);
    expect(user.getFirstName()).toEqual(firstName);
    expect(user.getLastName()).toEqual(lastName);
    expect(user.getEmail()).toEqual(email);
    expect(user.getPassword()).toEqual(password);
    expect(user.getRole()).toEqual(role);
});