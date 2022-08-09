function ItemForm(props) {

	return (
			<>
				<form onSubmit={props.onSubmit}>
					<div>
						<input 
							type="text" 
							id="name"
							name="name"
							placeholder="Enter item name"
							required 
					/>
					</div>
					<div>
						<button className="btn">Submit</button>
					</div>
				</form>
			</>
	)
}

export default ItemForm
