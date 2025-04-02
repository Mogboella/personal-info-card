export interface Name {
    firstName: string;
    lastName: string;
}

export interface Address {
    line1: string;
    line2?: string;
    line3?: string;
    town: string;
    county: string;
    eircode?: string;
    country?: string;
}

export interface Link {
    name: string;
    url: string;
}

export interface PhoneNumber {
    countryCode: string;
    number: string;
}

export interface Info {
    name: Name;
    email: string;
    links: Link[];
    number: PhoneNumber;
    address: Address;
}

export type CopyableField = keyof Info | `links.${number}`;