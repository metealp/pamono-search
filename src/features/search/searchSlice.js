import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const baseURL = 'http://www.omdbapi.com/?apikey=c54a0aa0';

export const searchMovie = createAsyncThunk('search/searchMovie', async( searchParams, { rejectWithValue }) => {
    try {
        const config = {
            method: 'get',
            url: `${baseURL}&s=${searchParams}`,
        };         
        const response = await axios(config);
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const fetchMovieById = createAsyncThunk('search/fetchMovieById', async( id, { rejectWithValue }) => {
    try {
        const config = {
            method: 'get',
            url: `${baseURL}&i=${id}`,
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
    detailedMovie: null,
    status: 'idle',
    detailStatus: 'idle',
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
            if(action.payload.data.Response === "True"){
                state.status = 'succeeded';
                state.error = null;
                state.searchResult = action.payload.data.Search;
            }
            else if(action.payload.data.Response === "False"){
                state.status = 'failed';
                state.error = action.payload.data.Error;
            }
        },
        [searchMovie.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = 'Could not fetch search results, please try again!';
        },
        [fetchMovieById.pending]: (state, action) => {
            state.detailStatus = 'loading'
        },
        [fetchMovieById.fulfilled]: (state, action) => {
            if(action.payload.data.Response === "True"){
                state.detailStatus = 'succeeded';
                state.error = null;
                state.detailedMovie = action.payload.data;
            }
            else if(action.payload.data.Response === "False"){
                state.detailStatus = 'failed';
                state.error = action.payload.data.Error;
            }
        },
        [fetchMovieById.rejected]: (state, action) => {
            state.detailStatus = 'failed';
            state.error = 'Could not fetch search results, please try again!';
        },
    }
})

export default searchSlice.reducer

// export const {} = searchSlice.actions

//=============== SELECTORS ===============//
export const selectAllMovies = state => state.searchResult