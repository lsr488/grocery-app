const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME });
		console.log(`MonogoDB Connected: ${connection.connection.host}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
}

module.exports = connectDB;