import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const searchMovie = createAsyncThunk('search/searchMovie', async( searchParams, { rejectWithValue }) => {
    try {
        console.log(searchParams);
        const config = {
            method: 'get',
            // url: `${configs.baseUrl}/auth/pending_users`,
        };
          
        const response = await axios(config);
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})

//=============== CREATE SLICE ===============//
const initialState = {
    searchResult: [],
    status: 'idle',
    error: null,
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
    },
    extraReducers: {
        [searchMovie.pending]: (state, action) => {
            state.status = 'loading'
        },
        [searchMovie.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.error = null;
            if(action.payload.data){
                state.pendingList = action.payload.data.foundPendings;
            }
        },
        [searchMovie.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = 'Could not fetch search results, please try again!';
        },
    }
})

export default searchSlice.reducer

// export const {} = searchSlice.actions

//=============== SELECTORS ===============//
export const selectAllMovies = state => state.searchResult