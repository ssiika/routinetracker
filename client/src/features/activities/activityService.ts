import axios from 'axios';

const API_URL = '/api/activities/'
const API_URL_RECORD = '/api/records/'

const createActivity = async (activityData: object, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, activityData, config)
        .catch(function (error) {
            if (error.response.data) {
                throw new Error(error.response.data.message);
            }
            })
            
    if (response && response.data) {
        return response.data
    }
        

    return response;
}

const getActivities = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
        .catch(function (error) {
            if (error.response.data) {
                throw new Error(error.response.data.message);
            }
            })
            
    if (response && response.data) {
        return response.data
    }
        

    return response;
}

const updateActivity = async (activityData: {id: string, color: string}, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + activityData.id, activityData, config)
        .catch(function (error) {
            if (error.response.data) {
                throw new Error(error.response.data.message);
            }
            })
            
    if (response && response.data) {
        return response.data
    }
        

    return response;
}

const createTimeslot = async (recordData: {id: string, day: string, starttime: number, endtime: number}, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL_RECORD + recordData.id, recordData, config)
        .catch(function (error) {
            if (error.response.data) {
                throw new Error(error.response.data.message);
            }
            })
            
    if (response && response.data) {
        return response.data
    }
        

    return response;
}

const activityService = {
    createActivity,
    getActivities, 
    updateActivity,
    createTimeslot
}

export default activityService