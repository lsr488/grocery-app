import {FaTrash} from 'react-icons/fa'

function ButtonDelete(props) {
  return (
    <span
      className={`e
      lement-icon-trash ${props.isEditing ? 'hidden' : null}`}
      id="delete-btn"
      onClick={props.handleClick}    
    >
      <FaTrash />
    </span>
  )
}

export default ButtonDelete