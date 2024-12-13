import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    userType: string;
    username: string;
    password: string;
    Tags: Array<string>;
    firstName: string;
    middleName: string;
    lastName: string;
    organizationName: string;
    chooseMembership: string;
    friends: Array<string>;
}