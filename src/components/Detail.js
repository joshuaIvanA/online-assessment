import {Link, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import action from "../action";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  const {id} = useParams()
  const detail = useSelector(state => state.movie.selectedMovie)
  const dispatch = useDispatch()

  const findById = () => {
    action.findByImdbId({dispatch}, {params: {id}})
  }
  const getDetail = () => {
    return Object.entries(detail)
        .filter(([k]) => !['Ratings', 'Poster', 'Response'].includes(k))
        .map(([k, v], index) =>
            (<tr key={index}>
              <td key={"key"}><span><b>{k}</b></span></td>
              <td key={"value"}><span>{v}</span></td>
            </tr>))
  }
  const getRatings = () => {
    return (detail['Ratings'] || [])
        .map(({Source, Value}) => (
            <div key={Source}>
              <div><span><b>{Source}</b></span></div>
              <div><span>{Value}</span></div>
            </div>))
  }
  useEffect(() => findById(), [])

  return (
      <div>
        <Link to='/'>Go back</Link>
        <h1>Detail Movie</h1>
        <div>
          <div className={"ratings-container"}>
            {getRatings()}
          </div>
          <div className={"detail-container"}>
            <img alt="" src={detail.Poster}/>
            <table className={"table-detail"}>
              <tbody>
              {getDetail()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}