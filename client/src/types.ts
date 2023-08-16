export interface Record {
    _id: string,
    user: string,
    activity_id: string,
    day: Date,
    time: number
}

export interface recordState {
    userRecordList: Record[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
    
}

export interface Activity {
    _id: string,
    user: string,
    name: string,
    color: string,
    start: Date,
    timeslots: Timeslot[]
}

export interface activityState {
    userActivityList: Activity[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

export interface Timeslot {
    day: string,
    starttime: string,
    endtime: string
}


export interface User {
    username: string,
    password: string
}

export interface RecordUpdateData {
    id?: string,
    activity_id: string,
    activity_name: string,
    day: Date | string
}