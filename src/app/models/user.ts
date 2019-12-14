export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Adress;
    phone: string;
    website: string;
    company: Company;
}

class Adress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lon: string;
    };
}


class Company {
    name: string;
    catchPhrase: string;
    bs: string;
}
