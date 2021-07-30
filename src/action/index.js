import http from "../utils/http-util";
import {appendMovies, updateMovies, updateSelectedMovie} from "../store/movieSlice";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  searchMovie({dispatch}, {params, success, fail} = {}) {
    const query = Object.entries(params).reduce((acc, [k, v]) => acc += `&${k}=${v}`, '')
    http.get(`http://www.omdbapi.com?apikey=faf7e5bb${query}`,
        ({data} = {}) => {
          params.page === 1 ? dispatch(updateMovies(data)) : dispatch(appendMovies(data))
          success && success(data)
        }, (err) => dispatch(updateMovies({Search: [], totalResults: 0})))
  },
  findByImdbId({dispatch}, {params, success, fail} = {}) {
    const {id} = params
    http.get(`http://www.omdbapi.com?apikey=faf7e5bb&i=${id}`,
        ({data}) => dispatch(updateSelectedMovie(data)),
        () => dispatch(updateSelectedMovie({})))
  }
}