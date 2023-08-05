import { Request } from 'express'

export interface RequestWUser extends Request {
    user: any
}

export interface ActivityFormat {
    _id: string,
    user: string,
    name: string,
    color: string,
    start: Date,
    timeslots: TimeslotFormat[]
}

export interface RecordFormat {
    _id: string,
    user: string,
    activity_id: string,
    day: Date,
    time: number
}

export interface TimeslotFormat {
    day: Number,
    starttime: Number,
    duration: Number
}
