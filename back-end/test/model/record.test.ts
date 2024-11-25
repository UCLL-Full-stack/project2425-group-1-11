import { Pacient } from "../../model/pacient"
import { Record } from "../../model/record"
import { User } from "../../model/user"

const userPacient1 = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "pacient"})

const pacient1 = new Pacient({id: 1, user: userPacient1, records: [], appointments: []})

const pacient = pacient1;
const title = "Title 1";
const description = "Description about title 1.";

const record = new Record({pacient: pacient, title: title, description: description})

test('given: valid values for record, when: record is created, then: record is created with those values', () => {
    expect(record.getPacient()).toEqual(pacient);
    expect(record.getTitle()).toEqual(title);
    expect(record.getDescription()).toEqual(description);
});

test('given: invalid values for record, when: record pacient is missing, then: appropriated error is returned', () => {
    const record = () => 
        new Record({pacient: undefined as unknown as Pacient, title: title, description: description})

    expect(record).toThrow('Pacient is required.');
});

test('given: invalid values for record, when: record title is missing, then: appropriated error is returned', () => {
    const record = () => 
        new Record({pacient: pacient, title: "", description: description})

    expect(record).toThrow('Title is required.');
});

test('given: invalid values for record, when: record description is missing, then: appropriated error is returned', () => {
    const record = () => 
        new Record({pacient: pacient, title: title, description: ""})

    expect(record).toThrow('Description is required.');
});