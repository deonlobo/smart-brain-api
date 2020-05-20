const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'f8eec6659a2845ffaa7d858bbbe65ee9'
});

const handleApiCall = (req,res) => {
	app.models
		.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req,res,db) => {
	const {id} = req.body;
	db('users').where('id','=',id)
		.increment('entries',1)
		.then(user => {
			return db.select('entries').from('users').where('id', id)
				.then(data => {res.json(data[0]);})
		})
		.catch(err => res.status(400).json('unable to get entries'))
    
}
module.exports ={
	handleImage,
	handleApiCall
}