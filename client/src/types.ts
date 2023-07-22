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
    timeslots: object[],
    createdAt: string,
    updatedAt: string

}

export interface activityState {
    userActivityList: Activity[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

export interface User {
    username: string,
    password: string
}