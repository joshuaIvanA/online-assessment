import {createSlice} from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    Search: [],
    selectedMovie: {}
  },
  reducers: {
    appendMovies(state, {payload}) {
      state.Search = [...state.Search, ...payload.Search]
    },
    updateMovies(state, {payload}) {
      state.Search = payload.Search
    },
    updateSelectedMovie(state, {payload}) {
      state.selectedMovie = payload
    }
  }
})
export const {appendMovies, updateMovies, updateSelectedMovie} = movieSlice.actions
export default movieSlice.reducer
