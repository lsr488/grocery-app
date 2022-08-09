import {FaCheck} from 'react-icons/fa'

function ButtonSave(props) {
  return (
    <span
      className={`element-icon-save ${props.isEditing ? '' : 'hidden'}`}
      id="save-btn"
      onClick={props.handleClick}    
    >
      <FaCheck />
    </span>
  )
}

export default ButtonSave