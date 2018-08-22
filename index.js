const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const router = express.Router()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.connect("mongodb://127.0.0.1:27017/dodo", {useNewUrlParser: true })
	.then(res => {
		console.log("connected to database")
	})
	.catch(err => {
		console.log(err)
		process.end()
	})

const personSchema = new mongoose.Schema({
	name: String,
	email: String,
	phone: String
})

const Person = mongoose.model('Person', personSchema)

router.route("/")
  .get((req, res) => {
    res.send({
      dodo: "duck"
    })
  })

/*
	Utility merror message
*/
const checkKeys = (obj, ...args)	=> {
	let value = true
	const keys = Object.keys(obj)
	args.forEach(key => {
		value = value && keys.includes(key)
	})
	return value
}

const errMessage = (res, msg) => {
	return res.status(401).send({
		status: false,
		msg
	})
}

const succMessage = (res, data) => {
	return res.status(200).send({
		status: true,
		data
	})
}

router.route("/users")
	.post((req, res) => {
		if(checkKeys({...req.body}, "name", "email", "phone")) {
			const newPerson = new Person({...req.body })
			newPerson.save()
				.then(person => {
					succMessage(res, person)
				})
		} else {
			errMessage(res, "please pass all parameter")
		}
	})
	.get((req, res) => {
		Person.find({})
			.then(persons => {
				succMessage(res, persons)
			})
			.catch(err => {
				return errMessage(res, err.message())
			})
	})

app.use("/", router)

app.listen(3000, () => {
  console.log("listening on http://localhost:3000")
})
