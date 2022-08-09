function RecipeNotes(props) {
  // splits recipe notes into an array so they can be broken onto own lines
	const splitNotes = (notes => notes.split(';'))
  
  return (
    <>
    {props.notes ?
      <span className="element-recipe-notes">
        {splitNotes(props.notes).map((note, index) => <div key={index}>{note}</div>)}
      </span>
      : 
      null    
    }

    </>
    
  )
}

export default RecipeNotes