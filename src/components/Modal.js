// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  return (
      <div className={`modal-container ${props.className}`} onClick={props.closeModal}>
        <img alt={""} src={props.url}/>
      </div>
  )
}