import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import recordService from './recordService'
import { RootState } from '../../app/store'
import { Record, recordState } from '../../types'

const initialState: recordState = {
    userRecordList: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createRecord = createAsyncThunk<Record, object, { state: RootState }>('record/create',
async (recordData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await recordService.createRecord(recordData, token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const getRecords = createAsyncThunk<Record[], undefined, { state: RootState }>('record/get',
async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await recordService.getRecords(token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const updateRecord = createAsyncThunk<Record, {id: string, time: string}, { state: RootState }>('record/update',
async (recordData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await recordService.updateRecord(recordData, token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const deleteRecords = createAsyncThunk<Record[], {id: string}, { state: RootState }>('record/delete',
// Used for deleting all records of an activity when removing an activity
async (recordData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await recordService.deleteRecords(recordData, token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const recordSlice = createSlice({
    name: 'record', 
    initialState, 
    reducers: {
        recordReset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRecord.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
                state.userRecordList.push(action.payload);
            })
            .addCase(createRecord.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(getRecords.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
                state.userRecordList = action.payload;
            })
            .addCase(getRecords.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(updateRecord.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
                state.userRecordList = state.userRecordList.map((record) => record._id === action.payload._id ? 
                action.payload : 
                record);
            })
            .addCase(updateRecord.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(deleteRecords.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteRecords.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
                state.userRecordList = action.payload;
            })
            .addCase(deleteRecords.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
    }
})

export const {recordReset} = recordSlice.actions;
export default recordSlice.reducer