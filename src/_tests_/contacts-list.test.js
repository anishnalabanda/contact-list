import ContactsList from "../components/contacts-list/contacts-list.jsx";

describe("Contact list events test", () => {
    test("onContactListChange", () => {
        expect(new ContactsList({}).onContactListChange(0, { style: 'disabled' }).not.toThrow(error));
    });
    test("prepareContactList", () => {
        expect(new ContactsList({}).prepareContactList(results).not.toThrow(error));
    });
    test("onContactShowChange", () => {
        expect(new ContactsList({}).onContactShowChange({},{}).toThrow(error));
    });
    test("onContactShowChange", () => {
        expect(new ContactsList({}).getRandomContacts().toBe(undefined));
    });
});

const results = [
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Mikael",
            "last": "Lampinen"
        }
    },
    {
        "gender": "male",
        "name": {
            "title": "Monsieur",
            "first": "Karl",
            "last": "Dumas"
        }
    }
];

