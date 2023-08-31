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
    _id: string,
    day: string,
    startTime: string,
    endTime: string
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

export interface GraphData {
    year: number,
    // Month should be month array index
    month: number,
    total: number,
    
}