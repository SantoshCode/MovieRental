import * as mongoose from 'mongoose';

let database: mongoose.Connection;
//! method is connects to mongodb database if not connected 
//! if it is already connected then it doesnot connects again
export const connect = () => {
	const uri = 'mongodb://localhost:5001/vidly'

	if(database){
		return;
	}

	mongoose.connect(uri,{useNewUrlParser:true,	useUnifiedTopology:true	})

	database = mongoose.connection;

	database.once('open',async()=>{
		console.log('Connected to database')
	})

	database.on('error',()=>{
		console.error('Error connecting to database')
	})

}
//! method  disconnects from mongodb database if connected 
export const disconnect =() => {
	if(!database){
		return;
	}
	mongoose.disconnect();
}