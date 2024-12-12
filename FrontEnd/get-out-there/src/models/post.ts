import { ObjectId } from "mongodb";

export interface Post {
    Caption: string;
    LocationName: string;
    Description: string;
    Date: Date;
    Tags: Array<string>;
    _id?: ObjectId;
    UserId: string;
}