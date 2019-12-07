import React from 'react';
import { cleanup, render } from '@testing-library/react';
import ContactCard from '../components/contact-card.jsx';

afterEach(cleanup);

it('Contact card renders contact info', () => {
    const { queryByLabelText } = render(
        <ContactCard position={position} contact={contact} closeContactCard={()=>{}}/>,
    );
    expect(queryByLabelText(/Mikael/i)).toBeTruthy();
    expect(queryByLabelText(/Lampinen/i)).toBeTruthy();
});

const position = { left: 0, right: 0, width: 500 };
const contact = {
    "gender": "male",
    "name": {
        "title": "Mr",
        "first": "Mikael",
        "last": "Lampinen"
    },
    "location": {
        "street": {
            "number": 3764,
            "name": "Hämeenkatu"
        },
        "city": "Pihtipudas",
        "state": "Kainuu",
        "country": "Finland",
        "postcode": 44087,
        "coordinates": {
            "latitude": "-15.5963",
            "longitude": "-147.8751"
        },
        "timezone": {
            "offset": "+5:00",
            "description": "Ekaterinburg, Islamabad, Karachi, Tashkent"
        }
    },
    "email": "mikael.lampinen@example.com",
    "login": {
        "uuid": "97b63a36-eeab-45d5-bc2f-525c86fdf1ba",
        "username": "blackzebra419",
        "password": "robotics",
        "salt": "55NUvZuE",
        "md5": "bf7941cc9fe310304a22405b892213c8",
        "sha1": "900ca99a0f6b8dea0487525ce57ed12b81f19782",
        "sha256": "187522271488cd1f1bace484ca01aa1608aca1277fdde62ad71eb5ae45813043"
    },
    "dob": {
        "date": "1954-02-20T09:51:02.590Z",
        "age": 65
    },
    "registered": {
        "date": "2008-08-02T17:24:22.715Z",
        "age": 11
    },
    "phone": "06-498-917",
    "cell": "046-298-21-83",
    "id": {
        "name": "HETU",
        "value": "NaNNA265undefined"
    },
    "picture": {
        "large": "https://randomuser.me/api/portraits/men/80.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/80.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/80.jpg"
    },
    "nat": "FI"
};

