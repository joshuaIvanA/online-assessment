import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import movieSlice from "./store/movieSlice";

test('renders App', () => {
  const store = configureStore({reducer: {movie: movieSlice}})

  render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>);
});
