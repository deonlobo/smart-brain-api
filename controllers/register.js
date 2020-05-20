const handleRegister = (req,res,db,bcrypt)=>{
	const {email,name,password} = req.body;
	if(!email || !name || !password){
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.then(loginEmail => {
/*				trx.select('*').from('login').where('email',email )
				.then(data => {res.json(data;}))*/
				return trx('users')
					.insert({

						email: email,
						name : name,
						joined : new Date()
					})
					.then(user => { 	
						return trx.select('*').from('users').where('id','=',user[0])
						.then(data => {res.json(data[0]);})
					})

		})
		.then(trx.commit)
		.catch(trx.rollback)


	})
	.catch(err => res.status(400).json('unable to register'))


}

module.exports ={
	handleRegister: handleRegister
}