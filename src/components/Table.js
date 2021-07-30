import {useDispatch, useSelector} from "react-redux";
import action from "../action";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Modal} from "./index";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const [state, _setState] = useState({
    s: 'Batman',
    page: 1,
    posterUrl: '',
    showModal: false,
    totalMovies: 0,
    totalResults: 0
  })
  const ref = useRef(state)
  const listMovies = useSelector(state => state.movie.Search)
  const dispatch = useDispatch()
  const setState = (data) => {
    ref.current = data
    _setState(data)
  }

  function search(params = {s: state.s, page: state.page}) {
    action.searchMovie({dispatch}, {
      params,
      success: ({Search = [], totalResults = 0}) => {
        const data = (params.page > 1) ? {totalMovies: state.totalMovies + Search.length} : {totalMovies: Search.length}
        setState({...state, ...params, ...data, totalResults})
      }
    })
  }

  function getList() {
    if (!listMovies) {
      return
    }
    return listMovies.map(({Title, imdbID, Type, Year, Poster}, index) =>
        (<div className={"movie-list"} key={index}>
          <img height={200} width={125} alt="" src={Poster}
               onClick={() => setState({...state, posterUrl: Poster, showModal: true})}/>
          <span><b>{Title}</b></span>
          <span>{Type}</span>
          <span>{Year}</span>
          <Link to={`/detail/${imdbID}`}>
            <button>Movie Detail</button>
          </Link>
        </div>))
  }

  function scrollHandler() {
    const {s, page, totalMovies, totalResults} = ref.current
    if ((window.pageYOffset + window.innerHeight) >= document.body.scrollHeight && totalMovies < totalResults) {
      search({s, page: page + 1})
    }
  }

  useEffect(() => {
    search()
    window.addEventListener('scroll', scrollHandler)
  }, [])

  return (
      <div>
        <h1>Show Movies</h1>
        <input id={"search-input"} onChange={(e) => search({s: e.target.value, page: 1})}/>
        <div className="movie-container">
          <h4>Found {state.totalResults} results for Search "{state.s}"</h4>
          <div style={{textAlign: 'left', width: '100%'}}>
            {getList()}
          </div>
        </div>
        <Modal className={`${state.showModal ? '--visible' : ''}`}
               url={state.posterUrl}
               closeModal={() => setState({...state, showModal: false})}/>
      </div>
  )
}