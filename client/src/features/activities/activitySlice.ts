import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import activityService from './activityService'
import { RootState } from '../../app/store'
import { Activity, activityState } from '../../types'

const initialState: activityState = {
    userActivityList: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createActivity = createAsyncThunk<Activity, object, { state: RootState }>('activity/create',
async (activityData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await activityService.createActivity(activityData, token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const getActivities = createAsyncThunk<Activity[], undefined, { state: RootState }>('activity/get',
async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await activityService.getActivities(token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const updateActivity = createAsyncThunk<Activity, {id: string, color: string}, { state: RootState }>('activity/update',
// For updating color
async (activityData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await activityService.updateActivity(activityData, token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const deleteActivity = createAsyncThunk<Activity, {id: string}, { state: RootState }>('activity/delete',
async (activityData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await activityService.deleteActivity(activityData, token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const createTimeslot = createAsyncThunk
<Activity, {id: string, day: string, startTime: string, endTime: string}, { state: RootState }>
('activity/createTimeslot',
async (recordData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await activityService.createTimeslot(recordData, token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const deleteTimeslot = createAsyncThunk
<Activity, string, { state: RootState }>
('activity/deleteTimeslot',
async (combinedId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await activityService.deleteTimeslot(combinedId, token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})


export const activitySlice = createSlice({
    name: 'activity', 
    initialState, 
    reducers: {
        activityReset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createActivity.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
                state.userActivityList.push(action.payload);
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(getActivities.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getActivities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
                state.userActivityList = action.payload;
            })
            .addCase(getActivities.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(updateActivity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateActivity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
                state.userActivityList = state.userActivityList.map((activity) => activity._id === action.payload._id ? 
                action.payload : 
                activity);
            })
            .addCase(updateActivity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(deleteActivity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
                state.userActivityList = state.userActivityList.filter((activity) => activity._id !== action.payload._id)
            })
            .addCase(deleteActivity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(createTimeslot.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createTimeslot.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
                state.userActivityList = state.userActivityList.map((activity) => activity._id === action.payload._id ? 
                action.payload : 
                activity);
            })
            .addCase(createTimeslot.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(deleteTimeslot.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTimeslot.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
                state.userActivityList = state.userActivityList.map((activity) => activity._id === action.payload._id ? 
                action.payload : 
                activity);
            })
            .addCase(deleteTimeslot.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
    }
})

export const {activityReset} = activitySlice.actions;
export default activitySlice.reducer