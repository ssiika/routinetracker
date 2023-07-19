import axios from 'axios';

const API_URL = '/api/records'

const createRecord = async (recordData: object, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, recordData, config)
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

const recordService = {
    createRecord,
}

export default recordService