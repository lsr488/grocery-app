import {FaRegSquare, FaSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'
import EditItem from './EditItem'

function ListItem(props) {
  return (
    <li className="element-container" id={props.id}>
      <span className="element-line-decoration">
        {props.isChecked === true ? <FaSquare /> : <FaRegSquare />}
        </span>

      {/* item name */}
      {/* conditionally renders edit form or name value */}
      {props.isEditing ? 
        // edit item values
        <EditItem item={props} onChange={props.onChange} />
      : 
        // strikethrough name on click, conditional className
        <span
          className={`element-item-name ${props.isChecked === true ? 'checked' : ''} ${props.isEditing ? 'hidden' : ''}`}
          id="strike"
          onClick={props.handleClick}
        >{props.name}</span>        
      }
      
      {/* edit button, conditional className */}
      <span
        className={`element-icon-edit ${props.isEditing ? 'hidden' : ''}`}
        id="edit-btn"
        onClick={props.handleClick}
      >
        <FaPen />
      </span>

      {/* delete button, conditional className */}
      <span 
        className={`e
        lement-icon-trash ${props.isEditing ? 'hidden' : null}`}
        id="delete-btn"
        onClick={props.handleClick}
        >
          <FaTrash />
      </span>

      {/* save button, conditional className */}
      <span
        className={`element-icon-save ${props.isEditing ? '' : 'hidden'}`}
        id="save-btn"
        onClick={props.handleClick}
      >
        <FaCheck />
      </span>
    </li>
  )
}

export default ListItem
