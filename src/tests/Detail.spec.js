import Detail from "../components/Detail";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import movieSlice from "../store/movieSlice";

describe('Detail test', () => {
  const preloadedState = {movie: {selectedMovie: {Title: 'Batman', Ratings: [{Source: 'Metacritic', Value: '0'}]}}}
  const store = configureStore({reducer: {movie: movieSlice}, preloadedState})

  it('render', () => {
    render(<Provider store={store}><BrowserRouter><Detail/></BrowserRouter></Provider>)
    expect(screen.getByText('Detail Movie')).toBeInTheDocument()
  })
})