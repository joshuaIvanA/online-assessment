import {configureStore} from "@reduxjs/toolkit";
import movieReducers from "./movieSlice";

export default configureStore({
  reducer: {
    movie: movieReducers
  }
})