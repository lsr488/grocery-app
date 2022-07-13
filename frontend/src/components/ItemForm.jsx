function ItemForm(props) {

	return (
			<>
				<h2>Item Form</h2>
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
