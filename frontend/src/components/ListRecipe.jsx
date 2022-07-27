import {FaSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'
import EditRecipe from './EditRecipe'

function ListRecipe(props) {
  // splits recipe notes into an array so they can be broken onto own lines
	const splitNotes = (notes => notes.split(';'))

  return (
    <li className="element-container" id={props.id}>
      <span className="element-line-decoration"><FaSquare /></span>

      {/* display editable form if isEditing is true, else display static element */}
      {props.isEditing
        ? <EditRecipe recipe={props} onChange={props.onChange}/>
        :
        <>
          {/* hyperlink recipe if url exists */}
          <span className="element-recipe-name">
            {props.url ? <a href={props.url}>{props.name}</a> : props.name}
          </span>

          {/* display notes if they exist*/}
          {props.notes 
            ? <span className="element-recipe-notes">{splitNotes(props.notes).map((note, index) => <div key={index}>{note}</div>)}
              </span>
            : null
          }
          
        </>
      }

      {/* edit icon */}
      <span 
          className={`element-icon-edit ${props.isEditing ? 'hidden' : ''}`}
          id='edit-btn'
          onClick={props.handleClick}
        >
          <FaPen />
        </span>

        {/* delete icon */}
        <span 
          className={`element-icon-trash ${props.isEditing ? 'hidden' : ''}`}
          id='delete-btn'
          onClick={props.handleClick}  
        >
          <FaTrash />
        </span>

        {/* save icon */}
        <span 
          className={`element-icon-save ${props.isEditing ? '' : 'hidden'}`}
          id='save-btn'
          onClick={props.handleClick}  
        >
          <FaCheck />
        </span>
    </li>
    )
}

export default ListRecipe