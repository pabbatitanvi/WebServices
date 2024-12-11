import { ObjectId } from "mongodb";

export interface Event {
    _id?: ObjectId;
    eventName: string,
    description: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    tags: Array<String>,
    price: string,
}