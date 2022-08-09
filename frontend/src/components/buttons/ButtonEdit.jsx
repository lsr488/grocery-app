import {FaPen} from 'react-icons/fa'

function ButtonEdit(props) {
  return (
    <span
      className={`element-icon-edit ${props.isEditing ? 'hidden' : ''}`}
      id="edit-btn"
      onClick={props.handleClick}    
    >
      <FaPen />
    </span>
  )
}

export default ButtonEdit