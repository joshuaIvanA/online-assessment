import Table from "../components/Table";
import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import movieSlice from "../store/movieSlice";
import {BrowserRouter} from "react-router-dom";

jest.mock('../action', () => ({
  searchMovie(_, {success}) {success({Search: [{}], totalResults: 10})}
}))

describe('Table test', () => {
  const preloadedState = {movie: {Search: [{Title: 'Batman', imdbID: '', Type: '', Year: '', Poster: ''}]}}
  const store = configureStore({reducer: {movie: movieSlice}, preloadedState})

  it('render', () => {
    render(<Provider store={store}><BrowserRouter><Table/></BrowserRouter></Provider>)
    expect(screen.getByText('Show Movies')).toBeInTheDocument()
    fireEvent.scroll(window, {y: document.body.scrollHeight})
    fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Test'}})
    fireEvent.click(screen.getAllByRole('img')[0])
    fireEvent.click(document.querySelector('.--visible'))
  })
})