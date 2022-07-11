function ItemForm(props) {

	return (
			<>
				<h2>Item Form</h2>
				<section className="form">
					<form onSubmit={props.onSubmit}>
						<div className="form-group">
							<input 
								type="text" 
								className="form-control" 
								id="name"
								name="name"
								placeholder="Enter item name" 
								required 
						/>
						</div>
						<div className="form-group">
							<button className="btn">Submit</button>
						</div>
					</form>
				</section>
			</>
	)
}

export default ItemForm


