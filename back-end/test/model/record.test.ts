import { Patient } from "../../model/patient"
import { Record } from "../../model/record"
import { User } from "../../model/user"

const userPatient1 = new User({id: 1, userName: "Freakiest", firstName: "Freak", lastName: "Bob", email: "freakbob@irina.com", password: "freak8", role: "patient"})

const patient1 = new Patient({id: 1, user: userPatient1, records: [], appointments: []})

const patient = patient1;
const title = "Title 1";
const description = "Description about title 1.";

const record = new Record({patient: patient, title: title, description: description})

test('given: valid values for record, when: record is created, then: record is created with those values', () => {
    expect(record.getPatient()).toEqual(patient);
    expect(record.getTitle()).toEqual(title);
    expect(record.getDescription()).toEqual(description);
});

test('given: invalid values for record, when: record title is missing, then: appropriated error is returned', () => {
    const record = () => 
        new Record({patient: patient, title: "", description: description})

    expect(record).toThrow('Title is required.');
});

test('given: invalid values for record, when: record description is missing, then: appropriated error is returned', () => {
    const record = () => 
        new Record({patient: patient, title: title, description: ""})

    expect(record).toThrow('Description is required.');
});